import { ReservationStatus } from "@prisma/client";
import { IsEnum, IsOptional } from "class-validator";

export class UpdateReservationDto {
    @IsOptional()
    @IsEnum(ReservationStatus)
    status?: ReservationStatus;

    date?: string;
}
