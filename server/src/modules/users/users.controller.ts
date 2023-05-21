import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { UserCreatePayload } from '../../validations/users.validation';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UsePipes(ZodValidationPipe)
  @Post()
  async create(@Body() payload: UserCreatePayload) {
    return await this.usersService.create(payload);
  }
}
