import { Injectable } from '@nestjs/common';
import { PrismaService } from '@core/global/prisma/prisma.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserDto } from './dto/user.dto';  // Import UserDto

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async createUser(createUserDto: CreateUserDto): Promise<UserDto> {
    const user = await this.prisma.user.create({
      data: createUserDto,
    });
    return user; // Ensure returning UserDto
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<UserDto> {
    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
    return user; // Ensure returning UserDto
  }

  async getUsers(): Promise<UserDto[]> {
    const users = await this.prisma.user.findMany();
    return users; // Ensure returning UserDto[]
  }

  async getUserById(id: string): Promise<UserDto> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    return user; // Ensure returning UserDto
  }

  async deleteUser(id: string): Promise<UserDto> {
    const user = await this.prisma.user.delete({
      where: { id },
    });
    return user; // Ensure returning UserDto
  }
}
