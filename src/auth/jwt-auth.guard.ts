import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {} 
//se crea un guardia de autenticacion que utiliza el token jwt para permitir o denegar el acceso a una ruta
