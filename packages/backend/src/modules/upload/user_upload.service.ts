import { Injectable } from "@nestjs/common";
import * as XLSX from "xlsx";
import * as bcrypt from "bcrypt";
import { PrismaService } from "@core/global/prisma/prisma.service";
import { UserService } from "@modules/user/user.service";

@Injectable()
export class UserUploadService {
    constructor(
        private prisma: PrismaService,
        private userService: UserService
    ) { }

    async importUsers(file: Express.Multer.File) {
        if (!file || !file.buffer) {
            throw new Error("Không có file được tải lên hoặc file không hợp lệ");
        }

        const workbook = XLSX.read(file.buffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData: any[] = XLSX.utils.sheet_to_json(sheet);
        console.log("Dữ liệu thô từ Excel:", JSON.stringify(jsonData, null, 2));

        if (jsonData.length === 0) {
            throw new Error("Dữ liệu trong file Excel không có");
        }

        const validRoles = ["STUDENT", "LECTURER", "ADMIN"];
        let successCount = 0;
        const errors: any[] = [];

        for (const [index, row] of jsonData.entries()) {
            const rowIndex = index + 2;
            const userName = row["Họ Tên"]?.toString().trim();
            const code = row["Mã Người Dùng"]?.toString().trim();
            const email = row["Email"]?.toString().trim();
            const passwordRaw = row["Mật Khẩu"];
            const password = passwordRaw !== undefined && passwordRaw !== null ? String(passwordRaw).trim() : "";
            const role = row["Vai Trò"]?.toString().trim().toUpperCase();

          if (!userName || !code || !email || !password || !role) {
              errors.push({ row: rowIndex, error: "Thiếu thông tin bắt buộc" });
              continue;
          }

          if (!validRoles.includes(role)) {
              errors.push({ row: rowIndex, error: `Vai trò không hợp lệ: ${role}` });
              continue;
          }

          const existingUser = await this.prisma.user.findFirst({
              where: {
                  OR: [{ code }, { email }],
              },
          });

          if (existingUser) {
              errors.push({ row: rowIndex, error: "Trùng mã người dùng hoặc email" });
              continue;
          }

          try {
              const hashedPassword = await bcrypt.hash(password, 10);

            await this.userService.create({
                userName,
                code,
                email,
                password: hashedPassword,
                role,
          });

              successCount++;
          } catch (error) {
              errors.push({ row: rowIndex, error: `Lỗi khi tạo user: ${error}` });
          }
      }

        if (successCount === 0) {
            throw new Error("Không có người dùng nào được nhập thành công");
        }

        return {
            message: `Đã nhập thành công ${successCount} người dùng`,
            errors,
        };
    }
}
