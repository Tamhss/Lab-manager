import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
    @ApiProperty({ description: 'User ID', example: '1234-5678-9101' })
    id: string;

    @ApiProperty({ description: 'Username of the user', example: 'john_doe' })
    userName: string;

    @ApiProperty({ description: 'Email of the user', example: 'john.doe@example.com' })
    email: string;

    @ApiProperty({ description: 'Role of the user', example: 'STUDENT' })
    role: string;

    @ApiProperty({ description: 'Created at', example: '2024-01-01T00:00:00Z' })
    createdAt: Date;

    @ApiProperty({ description: 'Updated at', example: '2024-01-01T00:00:00Z' })
    updatedAt: Date;
}
