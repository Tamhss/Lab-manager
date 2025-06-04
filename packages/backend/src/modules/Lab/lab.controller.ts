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
  UseGuards,
} from '@nestjs/common';
import { LabService } from './lab.service';
import { Prisma } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@Controller('labs')
export class LabController {
  constructor(private readonly labService: LabService) { }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getAll() {
    return this.labService.getAll();
  }

  @Get(':labId')
  @UseGuards(AuthGuard('jwt'))
  getById(@Param('labId') labId: string) {
    return this.labService.getById(labId);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() data: Prisma.LabCreateInput) {
    return this.labService.create(data);
  }

  @Put(':labId')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('labId') labId: string,
    @Body() data: Prisma.LabUpdateInput,
  ) {
    return this.labService.update(labId, data);
  }

  @Delete(':labId')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('labId') labId: string) {
    return this.labService.delete(labId);
  }
}
