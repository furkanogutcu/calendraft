import { Module } from '@nestjs/common';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';
import { PrismaModule } from '../../common/prisma/prisma.module';
import { UsersModule } from '../admin/users/users.module';
import { ServicesModule } from '../services/services.module';

@Module({
  imports: [PrismaModule, UsersModule, ServicesModule],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
})
export class AppointmentsModule {}
