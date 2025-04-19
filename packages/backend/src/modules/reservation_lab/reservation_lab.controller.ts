import { RolesGuard } from '../../core/global/auth/roles.guard';
import { Controller, Get, Post, Put, Delete, Body, Param, Query, Request } from '@nestjs/common';
import { ReservationLabService } from './reservation_lab.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '@core/global/auth/roles.decorator';
import { Role } from '@prisma/client';



@Controller('reservations-lab')
export class ReservationLabController {
  constructor(private readonly reservationService: ReservationLabService) {}

  @Post()
  @Roles('ADMIN', 'STUDENT', 'LECTURER')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async create(@Body() createReservationDto: CreateReservationDto, @Request() req) {
    const role: Role = req.user.role;
    return this.reservationService.create(createReservationDto, role);
  }

  @Get()
  @Roles('ADMIN', 'STUDENT', 'LECTURER')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async findAll(
    @Query('status') status?: string,
    @Query('userId') userId?: string,
  ) {
    return this.reservationService.findAll({ status, userId });
  }

  @Get(':id')
  @Roles('ADMIN', 'STUDENT', 'LECTURER')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async findOne(@Param('id') reservationId: string) {
    return this.reservationService.findOne(reservationId);
  }

  @Put(':id')
  @Roles('ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async update(
    @Param('id') reservationId: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationService.update(reservationId, updateReservationDto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async remove(@Param('id') reservationId: string) {
    return this.reservationService.remove(reservationId);
  }

  @Put(':id/approve-lecturer')
  @Roles('LECTURER')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async approveByLecturer(
    @Param('id') reservationId: string,
    @Body('lecturerId') lecturerId: string,
  ) {
    return this.reservationService.approveByLecturer(reservationId, lecturerId);
  }

  @Put(':id/approve-admin')
  @Roles('ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async approveByAdmin(@Param('id') reservationId: string) {
    return this.reservationService.approveByAdmin(reservationId);
  }
}