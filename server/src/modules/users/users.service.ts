import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { UserCreatePayload } from '../../validations/users.validation';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findByPhoneNumber(phoneNumber: string) {
    return await this.prismaService.user.findUnique({ where: { phoneNumber } });
  }

  async create(data: UserCreatePayload) {
    const user = await this.findByPhoneNumber(data.phoneNumber);

    if (user) throw new ConflictException('Phone number already exists');

    return await this.prismaService.user.create({ data });
  }
}
