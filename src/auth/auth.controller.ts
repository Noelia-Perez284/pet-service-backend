import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { LoginDto } from './dto/loginDto';
import { UserLoginDto } from './dto/userloginDto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    
    console.log(JSON.stringify(loginDto))
    try {
      var respuesta = await this.authService.login(loginDto);
      console.log(JSON.stringify(respuesta))
      return respuesta;
    } catch (error) {
      throw new HttpException('Ocurrió un error:1', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}