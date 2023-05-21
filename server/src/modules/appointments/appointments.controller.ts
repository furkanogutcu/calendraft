import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { UsersService } from '../admin/users/users.service';
import { ServicesService } from '../services/services.service';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { AppointmentCreatePayload } from '../../validations/appointments.validation';
import { Public } from '../../common/decorators/public.decorator';

@Public()
@Controller('appointments')
export class AppointmentsController {
  constructor(
    private readonly appointmentsService: AppointmentsService,
    private readonly usersService: UsersService,
    private readonly servicesService: ServicesService,
  ) {}

  @UsePipes(ZodValidationPipe)
  @Post()
  async create(@Body() payload: AppointmentCreatePayload) {
    await this.usersService.findById(payload.userId);
    const service = await this.servicesService.findById(payload.serviceId);

    return await this.appointmentsService.create(payload, service.price);
  }
}
