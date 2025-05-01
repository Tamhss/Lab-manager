import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    Body,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { LabService } from './lab.service';
import { Prisma } from '@prisma/client';

@Controller('labs')
export class LabController {
      constructor(private readonly labService: LabService) { }

      // GET /labs
    @Get()
    getAll() {
        return this.labService.getAll();
    }

      // GET /labs/:labId
    @Get(':labId')
    getById(@Param('labId') labId: string) {
        return this.labService.getById(labId);
    }

      // POST /labs
    @Post()
    create(@Body() data: Prisma.LabCreateInput) {
        return this.labService.create(data);
    }

      // PATCH /labs/:labId
      @Patch(':labId')
      update(
          @Param('labId') labId: string,
          @Body() data: Prisma.LabUpdateInput,
      ) {
          return this.labService.update(labId, data);
    }

      // DELETE /labs/:labId
    @Delete(':labId')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('labId') labId: string) {
        return this.labService.delete(labId);
    }
}
