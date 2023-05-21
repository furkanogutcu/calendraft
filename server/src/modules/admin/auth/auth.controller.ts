import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AccessTokenResponse, AuthService } from './auth.service';
import { Public } from '../../../common/decorators/public.decorator';
import { LocalAuthGuard } from '../../../common/guards/local-auth.guard';

@Controller('admin/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any): Promise<AccessTokenResponse> {
    return await this.authService.login(req.user);
  }
}
