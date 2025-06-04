// src/lecturers/lecturer.controller.ts
import { Controller, Get, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { LecturerService } from './lecturer.service';
import { LecturerResponseDto } from './dto/lecturer.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('lecturers')
export class LecturerController {
  constructor(private readonly lecturerService: LecturerService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getAllLecturers(): Promise<LecturerResponseDto> {
    try {
      const lecturers = await this.lecturerService.getAllLecturers();
      return {
        success: true,
        data: lecturers,
        message: 'Lecturers retrieved successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          error: 'Internal Server Error',
          message: 'Failed to fetch lecturers',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}