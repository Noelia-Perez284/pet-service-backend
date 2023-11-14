import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuarioService } from '../usuario/usuario.service';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { LoginDto } from './dto/loginDto';
import { UserLoginDto } from './dto/userloginDto';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) { }

  
  async login(loginDto: LoginDto): Promise<UserLoginDto> {

    let userlogin: UserLoginDto;

    try {
      const user = await this.usuarioService.findByCorreo(loginDto.correo);
      
      if (!user) {
        
        userlogin = {
        succes: false,
        token: "",
        correo: loginDto.correo,
        nombre: "",
        mensaje: "Usuario no encontrado",
        tipo: null,
          idUsuario: null,
        }
        return userlogin;  
      }
      
     // Comparamos la contraseña introducida con el hash almacenado en la base de datos
      const passwordMatch = await bcrypt.compare(loginDto.password, user.password);
      
      if (!passwordMatch) {

        userlogin = {
        succes: false,
        token: "",
        correo: loginDto.correo,
        nombre: "",
        mensaje: "Contraseña incorrecta",
        tipo: null,
        idUsuario: null,
        }
        return userlogin;
      }

      // Si la contraseña coincide, genera el token JWT

      const payload = { sub: user.idUsuario, name: user.nombre, email: user.correo,tipo:user.tipo };
      
      const tokenLogin = this.jwtService.sign(payload);

      userlogin = {
        succes: true,
        token: tokenLogin,
        correo: user.correo,
        nombre: user.nombre,
        mensaje: "Bienvenido",
        tipo: user.tipo,
        idUsuario: user.idUsuario
      }

    } catch (error) {
      console.log(error);

      userlogin = {
        succes: false,
        token: "",
        correo: loginDto.correo,
        nombre: "",
        mensaje: "Ocurrió un error al ingresar",
        tipo: null,
        idUsuario: null,
      }      
      return userlogin;
    }
    return userlogin;
  }

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
}
