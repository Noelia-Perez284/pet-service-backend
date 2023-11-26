import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  UnauthorizedException,
  createParamDecorator,
  ExecutionContext,
  Req,
} from "@nestjs/common";
import { MascotaService } from "./mascota.service";
import { CreateMascotaDto } from "./dto/create-mascota.dto";
import { UpdateMascotaDto } from "./dto/update-mascota.dto";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import * as jwt from 'jsonwebtoken';
import { Mascota } from "./entities/mascota.entity";

//import { Request } from 'express'; // Importa Request de express





@Controller("mascota")
export class MascotaController {
  constructor(private readonly mascotaService: MascotaService) {}




  @Post('create')
  // @UseGuards(JwtAuthGuard)
  async create(@Body() createMascotaDto: CreateMascotaDto, @Req() req) {
    let mas: Mascota;
    const token = req.headers.authorization;
   //console.log(token) 
    if (!token) {
      throw new UnauthorizedException('Token no proporcionado');
    }
    try {
      const decodedToken = jwt.verify(token, "12345678");  //obtener de lugar seguro                
      const ObjetoL = JSON.parse(JSON.stringify(jwt.decode(token)));  
  if (ObjetoL.tipo === 0) {
    throw new UnauthorizedException('Error , no tiene privilegios');
      } 
      

    mas= await this.mascotaService.create(createMascotaDto);

    } catch (err) {
      throw new UnauthorizedException('Error al crear la mascota'+err);
      console.error(err);
    }   
    return mas;
  }

  @Get()
  findAll() {
    return this.mascotaService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.mascotaService.findOne(+id);
  }

  @Get(":usuario/:idUsuario")
  async findByUsuario(@Param("idUsuario") idUsuario: number) {
    const mascotas = await this.mascotaService.findByUsuario(idUsuario);
    return mascotas;
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateMascotaDto: UpdateMascotaDto) {
    return this.mascotaService.update(+id, updateMascotaDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.mascotaService.remove(+id);
  }
}
