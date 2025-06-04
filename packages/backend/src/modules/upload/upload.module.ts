import { Module } from "@nestjs/common";
import { UploadController } from "./upload.controller";
import { DeviceCategoryUploadService } from "./category_upload.service";
import { DeviceUploadService } from "./device_upload.service";
import { PrismaService } from "@core/global/prisma/prisma.service";
import { UserUploadService } from "./user_upload.service";
import { UserModule } from "@modules/user/user.module";

@Module({
  imports: [UserModule],
  controllers: [UploadController],
  providers: [DeviceCategoryUploadService, DeviceUploadService, UserUploadService, PrismaService],
})
export class UploadModule {}