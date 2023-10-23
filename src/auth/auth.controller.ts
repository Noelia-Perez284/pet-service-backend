import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UserLoginDto } from './dto/usuarioLoginDto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto) {
    return this.authService.login(userLoginDto);
  }
}