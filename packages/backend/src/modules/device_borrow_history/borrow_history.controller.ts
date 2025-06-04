import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DeviceBorrowHistoryService } from './borrow_history.service';
import { CreateBorrowHistoryDto } from './dto/create_borrow_history.dto';
import { UpdateBorrowHistoryDto } from './dto/update_borrow_history.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('device-borrow-history')
export class DeviceBorrowHistoryController {
  constructor(private readonly borrowHistoryService: DeviceBorrowHistoryService) { }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createBorrowHistoryDto: CreateBorrowHistoryDto) {
    return this.borrowHistoryService.create(createBorrowHistoryDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.borrowHistoryService.findAll();
  }

  @Get(':borrowHistoryId')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('borrowHistoryId') borrowHistoryId: string) {
    return this.borrowHistoryService.findOne(borrowHistoryId);
  }

  @Patch(':borrowHistoryId')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('borrowHistoryId') borrowHistoryId: string, @Body() updateBorrowHistoryDto: UpdateBorrowHistoryDto) {
    return this.borrowHistoryService.update(borrowHistoryId, updateBorrowHistoryDto);
  }

  @Delete(':borrowHistoryId')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('borrowHistoryId') borrowHistoryId: string) {
    return this.borrowHistoryService.remove(borrowHistoryId);
  }
}
