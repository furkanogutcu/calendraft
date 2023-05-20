import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { PrismaModule } from '../../common/prisma/prisma.module';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, ServicesModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
