import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { AppointmentCreatePayload } from '../../validations/appointments.validation';

@Injectable()
export class AppointmentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: AppointmentCreatePayload, currentPrice: number | null) {
    const currentAppointment = await this.prismaService.appointment.findFirst({
      where: {
        serviceId: data.serviceId,
        startTime: {
          lt: data.endTime,
        },
        endTime: {
          gt: data.startTime,
        },
      },
    });

    if (currentAppointment) {
      throw new ConflictException('There is another appointment for this service between these hours.');
    }

    return await this.prismaService.appointment.create({ data: { ...data, price: currentPrice } });
  }
}
