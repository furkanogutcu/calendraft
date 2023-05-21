import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { AppointmentCreatePayload } from '../../validations/appointments.validation';

@Injectable()
export class AppointmentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: AppointmentCreatePayload) {
    return this.prismaService.appointment.create({ data });
  }
}
