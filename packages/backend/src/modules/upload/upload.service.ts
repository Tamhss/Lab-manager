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
        await this.prisma.deviceCategory.upsert({
          where: { name: row["Tên Thiết Bị"] },
          update: {
            quantity: Number(row["Số lượng"]), // Ghi đè số lượng thay vì cộng dồn
          },
          create: {
            name: row["Tên Thiết Bị"],
            quantity: Number(row["Số lượng"]),
          },
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
