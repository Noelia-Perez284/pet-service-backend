import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario';
import { UsuarioDto } from 'src/dto/usuarioDto';
import { UserDto } from 'src/dto/userDto';

@Controller('usuario')
export class UsuarioController {

    constructor(private readonly usuarioService: UsuarioService) { }


    @Get("listado")
    getUsuario(): Usuario[] {
        return this.usuarioService.getUsuarios()
    }

    @Post()
    postCreateUsuario(@Body() usuarioDto: UsuarioDto) {
        return this.usuarioService.createUsuario(usuarioDto);
    }

    @Post('login')
    login(@Body() loginDto: UserDto) {
        const { email, password } = loginDto;
        try {
            const loginOk = this.usuarioService.validateUser(email, password);
            if (loginOk) {
                return {
                    Estado: HttpStatus.OK,
                    Existe: true,
                    Mensaje: "Inicio de sesión exitoso",
                };
            } else {
                return {
                    Estado: HttpStatus.OK,
                    Existe: false,
                    Mensaje: "Usuario o contraseña invalidos",
                };
            }

        } catch (error) {
            return {
                Estado: HttpStatus.BAD_REQUEST,
                Existe: false,
                Mensaje: "Inicio de sesión fallido" + error.message,
            };

        }
    }
}
