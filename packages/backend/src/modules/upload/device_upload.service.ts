import { Injectable } from "@nestjs/common";
import * as XLSX from "xlsx";
import { PrismaService } from "@core/global/prisma/prisma.service";
import { Response } from "express";

@Injectable()
export class DeviceUploadService {
  constructor(private prisma: PrismaService) { }

  async importDevices(file: Express.Multer.File) {
    if (!file || !file.buffer) {
      throw new Error("Không có file được tải lên hoặc file không hợp lệ");
    }

    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const jsonData: any[] = XLSX.utils.sheet_to_json(sheet);
    console.log("Dữ liệu thô từ Excel:", JSON.stringify(jsonData, null, 2));

    if (jsonData.length === 0) {
      throw new Error("Dữ liệu trong file Excel không có");
    }

    const columnNames = Object.keys(jsonData[0]);
    console.log("Tên các cột trong Excel:", columnNames);

    const categoriesMap = new Map<string, string>();
    let successCount = 0;

    for (const row of jsonData) {
      const labId = row["Lab"]?.trim();
      if (!labId) {
        console.error("Thiếu tên Lab trong hàng:", row);
        continue;
      }

      const lab = await this.prisma.lab.findFirst({
        where: { labId },
      });
      console.log("Lab tìm thấy:", lab);

      if (!lab) {
        console.error(`Không tìm thấy lab với tên "${labId}"`);
        continue;
      }

      const categoryName = row["Loại Thiết Bị"]?.trim();
      if (!categoryName) {
        console.error("Thiếu tên loại thiết bị trong hàng:", row);
        continue;
      }

      try {
        const normalizedCategoryName = categoryName;
        const category = await this.prisma.deviceCategory.findFirst({
          where: { labId: lab.labId, name: normalizedCategoryName },
        });

        if (!category) {
          console.error(`Loại thiết bị "${categoryName}" chưa được tạo. Vui lòng upload loại thiết bị trước.`);
          continue;
        }

        categoriesMap.set(normalizedCategoryName, category.categoryId);
        console.log(`Loại thiết bị: ${normalizedCategoryName} -> ${category.categoryId}`);
      } catch (error) {
        console.error(`Lỗi khi tìm loại thiết bị ${categoryName}:`, error);
      }
    }

    // Tạo thiết bị mới
    for (const row of jsonData) {
      const categoryName = row["Loại Thiết Bị"]?.trim();
      if (!categoryName || !categoriesMap.has(categoryName)) {
        console.error(`Không tìm thấy loại thiết bị "${categoryName}" cho hàng:`, row);
        continue;
      }

      const deviceId = row["Mã Thiết Bị"];
      const deviceName = row["Tên Thiết Bị"];
      if (!deviceId || !deviceName) {
        console.error(`Thiếu Mã Thiết Bị hoặc Tên Thiết Bị cho hàng:`, row);
        continue;
      }

      try {
        await this.prisma.device.create({
          data: {
            deviceId,
            deviceName,
            description: row["Mô Tả"] || null,
            status: row["Trạng Thái"] || "NOT_IN_USE",
            borrowStatus: row["Trạng Thái Mượn"] || "COMPLETED",
            categoryId: categoriesMap.get(categoryName),
          },
        });
        console.log(`Đã nhập thiết bị: ${deviceName}`);
        successCount++;
      } catch (error) {
        console.error(`Lỗi khi nhập thiết bị ${deviceName || "không xác định"}:`, error);
      }
    }

    for (const [categoryName, categoryId] of categoriesMap) {
      try {
        const deviceCount = await this.prisma.device.count({
          where: { categoryId },
        });

        await this.prisma.deviceCategory.update({
          where: { categoryId },
          data: { quantity: deviceCount },
        });

        console.log(`Cập nhật số lượng cho "${categoryName}": ${deviceCount}`);
      } catch (error) {
        console.error(`Lỗi khi cập nhật số lượng cho "${categoryName}":`, error);
      }
    }

    if (successCount === 0) {
      throw new Error("Không có thiết bị nào được nhập thành công");
    }

    return { message: "Nhập thiết bị thành công", data: jsonData };
  }

  async exportDevices(res: Response, labId: string) {
    const devices = await this.prisma.device.findMany({
      where: {
        category: {
          labId: labId,
        },
      },
      include: {
        category: {
          select: {
            name: true,
            labId: true,
          },
        },
      },
    });
  
    if (devices.length === 0) {
      throw new Error('Không có thiết bị nào để xuất');
    }
  
    const dataToExport = devices.map((device) => ({
      'Mã Thiết Bị': device.deviceId,
      'Tên Thiết Bị': device.deviceName,
      'Mô Tả': device.description,
      'Trạng Thái': device.status,
      'Trạng Thái Mượn': device.borrowStatus,
      'Loại Thiết Bị': device.category.name,
      'Lab': device.category.labId,
    }));
  
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Devices');
  
    const exportBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
  
    res.setHeader('Content-Disposition', `attachment; filename="devices_${labId}.xlsx"`);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(exportBuffer);
  }
  
  
}
