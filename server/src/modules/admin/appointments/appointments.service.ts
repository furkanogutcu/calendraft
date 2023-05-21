import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { AppointmentUpdatePayload } from '../../../validations/admin/appointments.validation';

@Injectable()
export class AppointmentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findById(appointmentId: number) {
    const appointment = await this.prismaService.appointment.findUnique({ where: { id: appointmentId } });

    if (!appointment) throw new NotFoundException('Appointment not found!');

    return appointment;
  }

  async listByUserId(userId: number) {
    return this.prismaService.appointment.findMany({ where: { userId } });
  }

  async list() {
    return this.prismaService.appointment.findMany();
  }

  async update(appointmentId: number, data: AppointmentUpdatePayload) {
    await this.findById(appointmentId);

    return this.prismaService.appointment.update({ where: { id: appointmentId }, data });
  }

  async delete(appointmentId: number) {
    await this.findById(appointmentId);

    return this.prismaService.appointment.delete({ where: { id: appointmentId } });
  }
}
