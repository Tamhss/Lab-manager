import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserHistoryService } from './user_history.service';
import { CreateUserHistoryDto } from './dto/create_user_history.dto';

@Controller('user-history')
export class UserHistoryController {
  constructor(private readonly userHistoryService: UserHistoryService) {}

  @Post()
  create(@Body() createUserHistoryDto: CreateUserHistoryDto) {
    return this.userHistoryService.create(createUserHistoryDto);
  }

  @Get()
  findAll() {
    return this.userHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userHistoryService.findOne(id);
  }
}
