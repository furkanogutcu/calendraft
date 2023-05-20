import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

const select = { id: true, email: true, createdAt: true };

@Injectable()
export class AdminService {
  constructor(private readonly prismaService: PrismaService) {}

  async findByEmail(email: string) {
    return this.prismaService.admin.findUnique({
      where: { email },
      select,
    });
  }

  async list() {
    return this.prismaService.admin.findMany({
      select,
    });
  }

  async findById(adminId: number) {
    const admin = await this.prismaService.admin.findUnique({ where: { id: adminId }, select });

    if (!admin) throw new NotFoundException('Admin not found!');

    return admin;
  }

  async delete(adminId: number) {
    const adminCount = await this.prismaService.admin.count();

    if (adminCount <= 1) throw new NotAcceptableException('At least one admin is required');

    await this.findById(adminId);

    return this.prismaService.admin.delete({ where: { id: adminId }, select });
  }
}
