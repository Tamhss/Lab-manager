import { Controller, Get, Post, Put, Delete, Body, Param, Query, Request } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '@prisma/client';


@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createReservationDto: CreateReservationDto, @Request() req) {
    const role: Role = req.user.role;  // Lấy 'role' từ đối tượng request (JWT)
    return this.reservationService.create(createReservationDto, role);
  }

  @Get()
  async findAll(
    @Query('status') status?: string,
    @Query('userId') userId?: string,
  ) {
    return this.reservationService.findAll({ status, userId });
  }

  @Get(':id')
  async findOne(@Param('id') reservationId: string) {
    return this.reservationService.findOne(reservationId);
  }

  @Put(':id')
  async update(
    @Param('id') reservationId: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationService.update(reservationId, updateReservationDto);
  }

  @Delete(':id')
  async remove(@Param('id') reservationId: string) {
    return this.reservationService.remove(reservationId);
  }

  @Put(':id/approve-lecturer')
  @UseGuards(AuthGuard('jwt'))
  async approveByLecturer(
    @Param('id') reservationId: string,
    @Body('lecturerId') lecturerId: string,
  ) {
    return this.reservationService.approveByLecturer(reservationId, lecturerId);
  }

  @Put(':id/approve-admin')
  @UseGuards(AuthGuard('jwt'))
  async approveByAdmin(@Param('id') reservationId: string) {
    return this.reservationService.approveByAdmin(reservationId);
  }
}