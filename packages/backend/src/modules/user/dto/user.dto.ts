import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    userName: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    role: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
