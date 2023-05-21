import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ServicesService } from './services.service';
import { Public } from '../../common/decorators/public.decorator';

@Public()
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

  @Get(':serviceId/reserved-dates')
  async listReservedDateByServiceId(@Param('serviceId', ParseIntPipe) serviceId: number) {
    return await this.servicesService.listReservedDateByServiceId(serviceId);
  }
}
