import { Body, Controller, Delete, Param, ParseIntPipe, Patch, Post, UsePipes } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServiceCreatePayload, ServiceUpdatePayload } from '../../../validations/admin/services.validation';
import { ZodValidationPipe } from '@anatine/zod-nestjs';

@Controller('admin/services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @UsePipes(ZodValidationPipe)
  @Post()
  async create(@Body() body: ServiceCreatePayload) {
    return await this.servicesService.create(body);
  }

  @UsePipes(ZodValidationPipe)
  @Patch(':serviceId')
  async update(@Param('serviceId', ParseIntPipe) serviceId: number, @Body() body: ServiceUpdatePayload) {
    return await this.servicesService.update(serviceId, body);
  }

  @UsePipes(ZodValidationPipe)
  @Delete(':serviceId')
  async delete(@Param('serviceId', ParseIntPipe) serviceId: number) {
    return await this.servicesService.delete(serviceId);
  }
}
