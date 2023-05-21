import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UsePipes } from '@nestjs/common';
import { AdminService } from './admin.service';
import { RegisterPayload } from '../../validations/admin/auth.validation';
import { AuthService } from './auth/auth.service';
import { ZodValidationPipe } from '@anatine/zod-nestjs';

@Controller('admin/admins')
export class AdminController {
  constructor(private readonly adminService: AdminService, private readonly authService: AuthService) {}

  @UsePipes(ZodValidationPipe)
  @Post()
  async createAdmin(@Body() payload: RegisterPayload) {
    await this.authService.register(payload);

    return await this.adminService.findByEmail(payload.email);
  }

  @Get()
  async list() {
    return await this.adminService.list();
  }

  @Get(':adminId')
  async findById(@Param('adminId', ParseIntPipe) adminId: number) {
    return await this.adminService.findById(adminId);
  }

  @Delete(':adminId')
  async delete(@Param('adminId', ParseIntPipe) adminId: number) {
    return await this.adminService.delete(adminId);
  }
}
