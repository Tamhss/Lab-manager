import { Injectable } from "@nestjs/common";
import * as XLSX from "xlsx";
import { PrismaService } from "@core/global/prisma/prisma.service";

@Injectable()
export class DeviceCategoryUploadService {
  constructor(private prisma: PrismaService) { }

  async importDeviceCategories(file: Express.Multer.File) {
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

      const name = row["Loại Thiết Bị"]?.trim();
      const categoryId = row["Mã loại thiết bị"]?.trim();
      const quantity = row["Số lượng"] || 0;

      if (!name || !categoryId) {
        console.error("Thiếu tên hoặc mã loại thiết bị trong hàng:", row);
        continue;
      }

      try {
        let category = await this.prisma.deviceCategory.findFirst({
          where: {
            labId: lab.labId,
            categoryId: categoryId
          },
        });

        if (!category) {
          category = await this.prisma.deviceCategory.create({
            data: {
              categoryId: categoryId,
              name: name,
              quantity: quantity,
              labId: lab.labId,
            },
          });
          successCount++;
          console.log(`Đã thêm loại thiết bị mới: ${name} (${categoryId})`);
        } else {
          console.log(`Loại thiết bị đã tồn tại: ${name} (${categoryId})`);
        }
      } catch (error) {
        console.error(`Lỗi khi nhập loại thiết bị ${name}:`, error);
      }
    }

    if (successCount === 0) {
      throw new Error("Không có loại thiết bị nào được nhập thành công");
    }

    return {
      message: "Nhập loại thiết bị thành công",
      data: jsonData,
    };
  }
}
