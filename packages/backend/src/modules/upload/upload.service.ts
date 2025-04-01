import { Injectable } from "@nestjs/common";
import * as XLSX from "xlsx";
import { PrismaService } from "@core/global/prisma/prisma.service";
import { join } from "path";
import { unlink } from "fs";
import { Response } from "express";

@Injectable()
export class UploadService {
  constructor(private prisma: PrismaService) {}

  async importExcel(file: Express.Multer.File) {
    if (!file) {
      throw new Error("Không có file được tải lên");
    }

    const filePath = join(process.cwd(), file.path);
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const jsonData: any[] = XLSX.utils.sheet_to_json(sheet);

    if (jsonData.length === 0) {
      throw new Error("Dữ liệu trong file Excel không có");
    }

    const columnNames = Object.keys(jsonData[0]);
    console.log("Tên các cột trong Excel:", columnNames);
    console.log("Dữ liệu từ Excel:", jsonData);
    const categoryNames = [...new Set(jsonData.map(row => row["Loại Thiết Bị"]?.trim()))];
    const categoriesMap = new Map<string, string>();

    for (const categoryName of categoryNames) {
      if (!categoryName) {
        console.error("Tên loại thiết bị bị thiếu trong dữ liệu:", jsonData);
        continue;
      }

      try {
        const normalizedCategoryName = categoryName.trim();
        const category = await this.prisma.deviceCategory.upsert({
          where: { name: normalizedCategoryName },
          update: {}, 
          create: {
            name: normalizedCategoryName,
            quantity: 0,
          },
        });
        categoriesMap.set(normalizedCategoryName, category.categoryId);
        console.log(`Đã thêm loại thiết bị: ${normalizedCategoryName} -> ${category.categoryId}`);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(`Lỗi khi nhập loại thiết bị ${categoryName}:`, error.message);
        } else {
          console.error(`Lỗi không xác định khi nhập loại thiết bị ${categoryName}:`, error);
        }
      }
    }

    for (const row of jsonData) {
      const categoryName = row["Loại Thiết Bị"]?.trim();
      if (!categoryName || !categoriesMap.has(categoryName)) {
        console.error(`Không tìm thấy loại thiết bị "${categoryName}" cho thiết bị ${row["Tên Thiết Bị"]}`);
        console.error("Dữ liệu hàng:", row);
        continue;
      }

      try {
        await this.prisma.device.create({
          data: {
            deviceId: row["Mã Thiết Bị"],
            deviceName: row["Tên Thiết Bị"],
            description: row["Mô Tả"] || null,
            status: row["Trạng Thái"] || "NOT_IN_USE",
            borrowStatus: row["Trạng Thái Mượn"] || "COMPLETED",
            categoryId: categoriesMap.get(categoryName),
          },
        });
        console.log(`Đã nhập thiết bị: ${row["Tên Thiết Bị"]}`);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(`Lỗi khi nhập thiết bị ${row["Tên Thiết Bị"]}:`, error.message);
        } else {
          console.error(`Lỗi không xác định khi nhập thiết bị ${row["Tên Thiết Bị"]}:`, error);
        }
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
        console.log(`Đã cập nhật số lượng cho ${categoryName}: ${deviceCount}`);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(`Lỗi khi cập nhật số lượng cho loại thiết bị ${categoryName}:`, error.message);
        } else {
          console.error(`Lỗi không xác định khi cập nhật số lượng cho loại thiết bị ${categoryName}:`, error);
        }
      }
    }

    unlink(filePath, (err) => {
      if (err) console.error("Lỗi khi xóa file:", err);
    });

    return { message: "Nhập dữ liệu thành công", data: jsonData };
  }


  async exportExcel(res: Response) {
    const devices = await this.prisma.device.findMany({
      include: { category: true },
    });

    const jsonData = devices.map((device) => ({
      "Mã Thiết Bị": device.deviceId,
      "Tên Thiết Bị": device.deviceName,
      "Mô Tả": device.description || "",
      "Trạng Thái": device.status,
      "Trạng Thái Mượn": device.borrowStatus,
      "Loại Thiết Bị": device.category?.name || "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(jsonData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Devices");

    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

    res.setHeader(
      "Content-Disposition",
      'attachment; filename="devices_export.xlsx"',
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );

    res.send(Buffer.from(buffer));
  }
}
