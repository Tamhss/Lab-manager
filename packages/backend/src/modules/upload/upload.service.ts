import { Injectable } from "@nestjs/common";
import * as XLSX from "xlsx";
import { PrismaService } from "@core/global/prisma/prisma.service";
import { join } from "path";
import { unlink } from "fs";

@Injectable()
export class UploadService {
  constructor(private prisma: PrismaService) {}

  async importExcel(file: Express.Multer.File) {
    if (!file) {
      throw new Error("No file uploaded");
    }

    const filePath = join(process.cwd(), file.path);
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const jsonData: any[] = XLSX.utils.sheet_to_json(sheet);

    for (const row of jsonData) {
      try {
        // 1. Kiểm tra và tạo/cập nhật DeviceCategory trước
        const category = await this.prisma.deviceCategory.upsert({
          where: { name: row["Tên Loại Thiết Bị"] },
          update: {}, // Không cập nhật quantity ở đây
          create: {
            name: row["Tên Loại Thiết Bị"],
            quantity: 0, // Giá trị mặc định, sẽ cập nhật lại sau
          },
        });

        // 2. Tạo mới thiết bị Device
        await this.prisma.device.create({
          data: {
            id: row["Mã thiết bị"],
            deviceName: row["Tên Thiết Bị"],
            description: row["Mô Tả"] || null,
            status: row["Trạng Thái"] || "NOT_IN_USE",
            borrowStatus: row["Trạng Thái Mượn"] || "COMPLETED",
            categoryId: category.id, // Liên kết với bảng DeviceCategory
          },
        });

        // 3. Đếm lại số thiết bị thuộc category này
        const deviceCount = await this.prisma.device.count({
          where: { categoryId: category.id },
        });

        // 4. Cập nhật lại số lượng trong deviceCategory
        await this.prisma.deviceCategory.update({
          where: { id: category.id },
          data: { quantity: deviceCount },
        });

      } catch (error) {
        console.error(`Lỗi khi nhập thiết bị ${row["Tên Thiết Bị"]}:`, error);
      }
    }

    // Xóa file sau khi xử lý
    unlink(filePath, (err) => {
      if (err) console.error("Lỗi khi xóa file:", err);
    });

    return { message: "Import thành công", data: jsonData };
  }
}
