import { Controller, Delete, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { AppointmentsService } from '../appointments/appointments.service';

@Controller('admin/users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly appointmentsService: AppointmentsService) {}

  @Get()
  async list() {
    return await this.usersService.list();
  }

  @Get(':userId')
  async findById(@Param('userId', ParseIntPipe) userId: number) {
    return await this.usersService.findById(userId);
  }

  @Delete(':userId')
  async delete(@Param('userId', ParseIntPipe) userId: number) {
    return await this.usersService.delete(userId);
  }

  @Get(':userId/appointments')
  async listByUserId(@Param('userId', ParseIntPipe) userId: number) {
    await this.usersService.findById(userId);

    return await this.appointmentsService.listByUserId(userId);
  }
}
