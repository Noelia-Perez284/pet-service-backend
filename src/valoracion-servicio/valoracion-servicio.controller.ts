import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  ParseIntPipe,
  UseGuards,
  UnauthorizedException,
  Req,
} from "@nestjs/common";
import { ValoracionServicioService } from "./valoracion-servicio.service";
import { CreateValoracionServicioDto } from "./dto/create-valoracion-servicio.dto";
import { UpdateValoracionServicioDto } from "./dto/update-valoracion-servicio.dto";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

import * as jwt from 'jsonwebtoken';


@Controller("valoracion-servicio")
export class ValoracionServicioController {
  constructor(
    private readonly valoracionServicioService: ValoracionServicioService,
  ) {}

  @Get()
  findAll() {
    return this.valoracionServicioService.findAll();
  }

  @Get("usuario/:idUsuario/tarjeta/:idTarjetaServicio")
  findOne(
    @Param("idUsuario") idUsuario: number,
    @Param("idTarjetaServicio") idTarjetaServicio: number,
  ) {
    console.log("usuario", idUsuario);
    console.log("tarjeta", idTarjetaServicio);
    return this.valoracionServicioService.findOne(idUsuario, idTarjetaServicio);
  }

  @Get("valoresTarjeta/")
  votosYValoraciones(/* @Param("id") idTarjetaServicio: number */) {
    return this.valoracionServicioService.votosYValoraciones(/* idTarjetaServicio */);
  }


  @Put()
  createOrUpdate(@Body() updateValoracionServicioDto: UpdateValoracionServicioDto,@Req() req) {
    const token = req.headers.authorization;
    
    console.log(token);
    if (!token) {
      throw new UnauthorizedException('Token no proporcionado');
    }
    try {
      const decodedToken = jwt.verify(token, "12345678");  //obtener de lugar seguro 
      const ObjetoL = JSON.parse(JSON.stringify(jwt.decode(token)));
      if (ObjetoL.tipo === 0) {
        console.log(ObjetoL.tipo);
        throw new UnauthorizedException('Error , no tiene privilegios');
      }
    } catch (err) {
      throw new UnauthorizedException('Error al crear la valoracion'+ err);
      console.error(err);
    }   
    return this.valoracionServicioService.createOrUpdate(
      updateValoracionServicioDto,
    );
  }

  

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.valoracionServicioService.remove(+id);
  }
}
