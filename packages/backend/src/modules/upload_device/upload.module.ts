import { Module } from "@nestjs/common";
import { UploadController } from "./upload.controller";
import { DeviceCategoryUploadService } from "./category_upload.service";
import { DeviceUploadService } from "./device_upload.service";
import { PrismaService } from "@core/global/prisma/prisma.service";

@Module({
  controllers: [UploadController],
  providers: [DeviceCategoryUploadService, DeviceUploadService, PrismaService],
})
export class UploadModule {}