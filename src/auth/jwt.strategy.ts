import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'clave_secreta',
    });
  }

  // async validate(payload: any) {
  //   const usuario = await this.authService.validateUsuario(payload.correo, payload.password);
  //   if (!usuario) {
  //     throw new UnauthorizedException();
  //   }
  //   return usuario;
  // }
}
