import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { LabService } from './lab.service';
import { Prisma } from '@prisma/client';

@Controller('labs')
export class LabController {
  constructor(private readonly labService: LabService) { }

  @Get()
  getAll() {
    return this.labService.getAll();
  }

  @Get(':labId')
  getById(@Param('labId') labId: string) {
    return this.labService.getById(labId);
  }

  @Post()
  create(@Body() data: Prisma.LabCreateInput) {
    return this.labService.create(data);
  }

  @Put(':labId')
  update(
    @Param('labId') labId: string,
    @Body() data: Prisma.LabUpdateInput,
  ) {
    return this.labService.update(labId, data);
  }

  @Delete(':labId')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('labId') labId: string) {
    return this.labService.delete(labId);
  }
}
