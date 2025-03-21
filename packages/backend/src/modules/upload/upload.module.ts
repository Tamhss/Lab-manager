import { Module } from "@nestjs/common";
import { UploadService } from "./upload.service";
import { UploadController } from "./upload.controller";
import { PrismaService } from "@core/global/prisma/prisma.service";
import { MulterModule } from "@nestjs/platform-express";

@Module({
  imports: [
    MulterModule.register({
      dest: "./uploads",
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService, PrismaService],
})
export class UploadModule { }
