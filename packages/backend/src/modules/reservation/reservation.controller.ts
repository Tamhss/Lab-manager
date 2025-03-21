import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  async create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationService.create(createReservationDto);
  }

  @Get()
  async findAll(
    @Query('status') status?: string,
    @Query('userId') userId?: string,
  ) {
    return this.reservationService.findAll({ status, userId });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.reservationService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationService.update(id, updateReservationDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.reservationService.remove(id);
  }

  @Put(':id/approve-lecturer')
  async approveByLecturer(
    @Param('id') id: string,
    @Body('lecturerId') lecturerId: string,
  ) {
    return this.reservationService.approveByLecturer(id, lecturerId);
  }

  @Put(':id/approve-admin')
  async approveByAdmin(@Param('id') id: string) {
    return this.reservationService.approveByAdmin(id);
  }
}