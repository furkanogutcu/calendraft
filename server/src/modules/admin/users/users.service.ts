import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async list() {
    return await this.prismaService.user.findMany();
  }

  async findById(userId: number) {
    const user = await this.prismaService.user.findUnique({ where: { id: userId } });

    if (!user) throw new NotFoundException('User not found!');

    return user;
  }

  async delete(userId: number) {
    await this.findById(userId);

    return await this.prismaService.user.delete({ where: { id: userId } });
  }
}
