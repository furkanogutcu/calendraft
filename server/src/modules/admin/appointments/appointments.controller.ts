import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, UsePipes } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { AppointmentUpdatePayload } from '../../../validations/admin/appointments.validation';

@Controller('admin/appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Get()
  async list() {
    return await this.appointmentsService.list();
  }

  @Get(':appointmentId')
  async findById(@Param('appointmentId', ParseIntPipe) appointmentId: number) {
    return await this.appointmentsService.findById(appointmentId);
  }

  @UsePipes(ZodValidationPipe)
  @Patch(':appointmentId')
  async update(@Param('appointmentId', ParseIntPipe) appointmentId: number, @Body() payload: AppointmentUpdatePayload) {
    return await this.appointmentsService.update(appointmentId, payload);
  }

  @Delete(':appointmentId')
  async delete(@Param('appointmentId', ParseIntPipe) appointmentId: number) {
    return await this.appointmentsService.delete(appointmentId);
  }
}
