import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { ServiceCreatePayload, ServiceUpdatePayload } from '../../../validations/admin/services.validation';

@Injectable()
export class ServicesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: ServiceCreatePayload) {
    const service = await this.prismaService.service.findUnique({ where: { name: data.name } });

    if (service) throw new ConflictException('Service name already exists');

    return await this.prismaService.service.create({ data });
  }

  async findById(serviceId: number) {
    const service = await this.prismaService.service.findUnique({ where: { id: serviceId } });

    if (!service) throw new NotFoundException('Service not found!');

    return service;
  }

  async update(serviceId: number, data: ServiceUpdatePayload) {
    await this.findById(serviceId);

    return await this.prismaService.service.update({ where: { id: serviceId }, data });
  }

  async delete(serviceId: number) {
    await this.findById(serviceId);

    return await this.prismaService.service.delete({ where: { id: serviceId } });
  }
}
