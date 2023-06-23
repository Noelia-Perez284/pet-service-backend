import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario';

@Controller('usuario')
export class UsuarioController {
    constructor(private readonly usuarioService:UsuarioService){}


    @Get()
    getVehiculos(): Usuario[] {
        return this.usuarioService.getUsuarios()
    }
    @Post('login')
    login(@Body() body: { email: string; password: string }){
        return this.usuarioService.validateUser(body.email,body.password)
    }

    
}
