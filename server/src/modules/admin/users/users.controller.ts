import { Controller, Delete, Get, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('admin/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
}
