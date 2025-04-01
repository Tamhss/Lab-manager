import {
    Controller,
  Get,
    Post,
  Res,
    UploadedFile,
    UseInterceptors,
  } from "@nestjs/common";
  import { FileInterceptor } from "@nestjs/platform-express";
  import { UploadService } from "./upload.service";
import { Response } from "express"; 
  
  @Controller("upload")
  export class UploadController {
    constructor(private readonly uploadService: UploadService) {}
  
    @Post()
    @UseInterceptors(FileInterceptor("file"))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
      return this.uploadService.importExcel(file);
    }

    @Get("export")
    async exportExcel(@Res() res: Response) {
      return this.uploadService.exportExcel(res);
    }
  }
  