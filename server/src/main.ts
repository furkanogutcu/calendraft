import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './common/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { seedDb } from '../prisma/seeds';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Calendraft')
    .setDescription(
      'Calendraft is a web application that allows users to easily schedule their appointments online. This application offers a modern interface and user-friendly functionality to assist users in scheduling their appointments.',
    )
    .setVersion('0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);

  const prismaService = app.get(PrismaService);
  const configService = app.get(ConfigService);

  await seedDb(prismaService, configService);
}
bootstrap();
