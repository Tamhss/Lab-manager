import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
    UseGuards,
    Request,
} from "@nestjs/common";
import { ReservationService } from "./reservation.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CreateReservationDto } from "./dto/create-reservation";
import { User } from "src/auth/user.interface";
import { UpdateReservationDto } from "./dto/update-reservation";
import { ReservationStatus, Role } from "@prisma/client";

@Controller("reservations")
export class ReservationController {
    constructor(private readonly reservationService: ReservationService) { }

    // Lấy danh sách đặt chỗ
    @UseGuards(JwtAuthGuard)
    @Get()
    async getReservations() {
        return this.reservationService.getAllReservations();
    }

    // Lấy thông tin đặt chỗ theo ID
    @UseGuards(JwtAuthGuard)
    @Get(":id")
    async getReservationById(@Param("id") id: string) {
        return this.reservationService.getReservationById(id);
    }

    // Tạo mới đặt chỗ
    @UseGuards(JwtAuthGuard)
    @Post()
    async createReservation(
        @Body() createReservationDto: CreateReservationDto,
        @Request() req
    ) {
        const user: User = req.user; // Lấy user từ request
        return this.reservationService.createReservation(createReservationDto, user.id);
    }

    // Cập nhật đặt chỗ
    @UseGuards(JwtAuthGuard)
    @Put(":id")
    async updateReservation(
        @Param("id") id: string,
        @Body() updateReservationDto: UpdateReservationDto
    ) {
        return this.reservationService.updateReservation(id, updateReservationDto);
    }

    // Xóa đặt chỗ
    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    async deleteReservation(@Param("id") id: string) {
        return this.reservationService.deleteReservation(id);
    }

    // Kiểm tra xung đột lịch trước khi đặt
    @UseGuards(JwtAuthGuard)
    @Post("check-conflict")
    async checkConflict(@Body() dto: CreateReservationDto) {
        return this.reservationService.checkTimeConflict(dto.deviceId, new Date(dto.startTime), new Date(dto.endTime));
    }

    // Cập nhật trạng thái đặt chỗ (duyệt, từ chối, hoàn thành)
    @UseGuards(JwtAuthGuard)
    @Put(":id/status")
    async updateReservationStatus(@Param("id") id: string, @Body("status") status: ReservationStatus) {
        return this.reservationService.updateReservationStatus(id, status);
    }

    // Hủy đặt chỗ (người dùng có thể hủy lịch của mình, admin có thể hủy mọi lịch)
    @UseGuards(JwtAuthGuard)
    @Put(":id/cancel")
    async cancelReservation(@Param("id") id: string, @Request() req) {
        const user: User = req.user;
        const userRole = user.role as Role;
        return this.reservationService.cancelReservation(id, user.id, userRole);
    }
}
