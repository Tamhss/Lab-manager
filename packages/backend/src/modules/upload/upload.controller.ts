import { UserUploadService } from './user_upload.service';
import { DeviceCategoryUploadService } from './category_upload.service';
import { BadRequestException, Controller, Get, Param, Post, Query, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { DeviceUploadService } from './device_upload.service';
import { Response } from 'express';

@Controller('upload')
export class UploadController {
  constructor(
    private readonly deviceCategoryUploadService: DeviceCategoryUploadService,
    private readonly deviceUploadService: DeviceUploadService,
    private readonly userUploadService: UserUploadService,
  ) { }

  @Post('device-categories')
  @UseInterceptors(FileInterceptor('file'))
  async uploadDeviceCategories(@UploadedFile() file: Express.Multer.File) {
    try {
      const result = await this.deviceCategoryUploadService.importDeviceCategories(file);
      return {
        statusCode: 200,
        message: result.message,
        data: result.data,
      };
    } catch (error) {
      console.error("Lỗi khi nhập loại thiết bị:", error);

      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }

      throw new BadRequestException("Lỗi khi nhập loại thiết bị");
    }
  }

  @Post('devices')
  @UseInterceptors(FileInterceptor('file'))
  async uploadDevices(@UploadedFile() file: Express.Multer.File) {
    try {
      const result = await this.deviceUploadService.importDevices(file);
      return {
        statusCode: 200,
        message: result.message,
        data: result.data,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }

      throw new BadRequestException("Lỗi khi nhập thiết bị");
    }
  }
  
  @Get('device/export/:labId')
  async exportDevicesByLab(@Res() res: Response, @Param('labId') labId: string) {
    try {
      await this.deviceUploadService.exportDevices(res, labId);
    } catch (error) {
      console.error('Lỗi khi export thiết bị:', error);
      throw new BadRequestException(error instanceof Error ? error.message : 'Lỗi khi export thiết bị');
    }
  }

  @Post('users')
  @UseInterceptors(FileInterceptor('file'))
  async uploadUsers(@UploadedFile() file: Express.Multer.File) {
    try {
      const result = await this.userUploadService.importUsers(file);
      return {
        statusCode: 200,
        message: result.message,
        errors: result.errors,
      };
    } catch (error) {
      console.error("Lỗi khi nhập người dùng:", error);

      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }

      throw new BadRequestException("Lỗi khi nhập người dùng");
    }
  }

}