import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario';
import { UsuarioDto } from 'src/dto/usuarioDto';

@Controller('usuario')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) { }


    @Get()
    getVehiculos(): Usuario[] {
        return this.usuarioService.getUsuarios()
    }

    @Post()
    postPelicula(@Body() usuarioDto: UsuarioDto) {
        return this.usuarioService.createUsuario(usuarioDto);
    }

    @Post('login')
    login(@Body() body: { email: string; password: string }) {
        try {
            const loginOk = this.usuarioService.validateUser(body.email, body.password);
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
                    Mensaje: "Inicio de sesión fallido",
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
