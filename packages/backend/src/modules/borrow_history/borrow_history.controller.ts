import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BorrowHistoryService } from './borrow_history.service';
import { CreateBorrowHistoryDto } from './dto/create_borrow_history.dto';
import { UpdateBorrowHistoryDto } from './dto/update_borrow_history.dto';

@Controller('borrow-history')
export class BorrowHistoryController {
  constructor(private readonly borrowHistoryService: BorrowHistoryService) {}

  @Post()
  create(@Body() createBorrowHistoryDto: CreateBorrowHistoryDto) {
    return this.borrowHistoryService.create(createBorrowHistoryDto);
  }

  @Get()
  findAll() {
    return this.borrowHistoryService.findAll();
  }

  @Get(':borrowHistoryId')
  findOne(@Param('borrowHistoryId') borrowHistoryId: string) {
    return this.borrowHistoryService.findOne(borrowHistoryId);
  }

  @Patch(':borrowHistoryId')
  update(@Param('borrowHistoryId') borrowHistoryId: string, @Body() updateBorrowHistoryDto: UpdateBorrowHistoryDto) {
    return this.borrowHistoryService.update(borrowHistoryId, updateBorrowHistoryDto);
  }

  @Delete(':borrowHistoryId')
  remove(@Param('borrowHistoryId') borrowHistoryId: string) {
    return this.borrowHistoryService.remove(borrowHistoryId);
  }
}
