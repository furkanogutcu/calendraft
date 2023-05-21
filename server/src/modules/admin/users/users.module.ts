import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaModule } from '../../../common/prisma/prisma.module';
import { AppointmentsModule } from '../appointments/appointments.module';

@Module({
  imports: [PrismaModule, AppointmentsModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
