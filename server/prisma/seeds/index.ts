import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../src/common/prisma/prisma.service';
import adminSeed from './admin.seed';

export async function seedDb(prismaService: PrismaService, configService: ConfigService) {
  await adminSeed(prismaService, configService);
}
