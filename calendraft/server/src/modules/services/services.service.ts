import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class ServicesService {
  constructor(private readonly prismaService: PrismaService) {}

  async list() {
    return await this.prismaService.service.findMany();
  }

  async findById(serviceId: number) {
    const service = await this.prismaService.service.findUnique({ where: { id: serviceId } });

    if (!service) throw new NotFoundException('Service not found!');

    return service;
  }

  async listReservedDateByServiceId(serviceId: number) {
    await this.findById(serviceId);

    return await this.prismaService.appointment.findMany({
      where: { serviceId },
      select: { startTime: true, endTime: true },
    });
  }
}
