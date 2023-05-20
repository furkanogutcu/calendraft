import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './common/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { seedDb } from '../prisma/seeds';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  const prismaService = app.get(PrismaService);
  const configService = app.get(ConfigService);

  await seedDb(prismaService, configService);
}
bootstrap();
