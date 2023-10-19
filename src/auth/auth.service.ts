import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async buscarUsuarioPorCorreo(correo: string): Promise<Usuario | null> {
    return this.usuarioService.findByCorreo(correo);
  }
  

  async validateUsuario(correo: string, password: string) {
    const usuario = await this.buscarUsuarioPorCorreo(correo);

    if (usuario && usuario.password === password) {
      const { idUsuario, correo } = usuario;
      return { idUsuario, correo };
    }

    return null;
  }

  async login(usuario: any) {
    console.log('Iniciando proceso de autenticación...');
    
    // Verifica que esté la contraseña en "usuario" proporcionado
    if (!usuario || !usuario.correo || !usuario.password) {

      throw new UnauthorizedException('Credenciales incompletas');
    }
    
    // Valida las credenciales del usuario en el servicio de autenticación
    const validUser = await this.validateUsuario(usuario.correo, usuario.password);
  
    if (!validUser) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
  
    // Si las credenciales son válidas, genera un token JWT
    const payload = { correo: usuario.correo, sub: validUser.idUsuario };
    const token = this.jwtService.sign(payload);
  
    console.log('Token JWT generado:', token);
  
    return {
      access_token: token,
    };
  }
}
