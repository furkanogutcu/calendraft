import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ServicesService } from './services.service';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  async list() {
    return await this.servicesService.list();
  }

  @Get(':serviceId')
  async findById(@Param('serviceId', ParseIntPipe) serviceId: number) {
    return await this.servicesService.findById(serviceId);
  }
}
