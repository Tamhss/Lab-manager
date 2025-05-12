import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LabUsageService } from './lab_usage.service';
import { CreateLabUsageDto } from './dto/create_lab_usage.dto';
import { UpdateLabUsageDto } from './dto/update_lab_usage.dto';

@Controller('lab-usage')
export class LabUsageController {
  constructor(private readonly labUsageService: LabUsageService) {}

  @Post()
  create(@Body() dto: CreateLabUsageDto) {
    return this.labUsageService.create(dto);
  }

  @Get()
  findAll() {
    return this.labUsageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.labUsageService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateLabUsageDto) {
    return this.labUsageService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.labUsageService.remove(id);
  }
}
