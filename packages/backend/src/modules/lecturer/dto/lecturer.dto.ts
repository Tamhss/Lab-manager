// src/lecturers/dto/lecturer.dto.ts
export class LecturerDto {
    lecturerId: string;
    userId: string;
    userName: string;
    email: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  // DTO cho response danh sách
  export class LecturerResponseDto {
    success: boolean;
    data: LecturerDto[];
    message: string;
  }