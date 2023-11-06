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
} from "@nestjs/common";
import { ValoracionServicioService } from "./valoracion-servicio.service";
import { CreateValoracionServicioDto } from "./dto/create-valoracion-servicio.dto";
import { UpdateValoracionServicioDto } from "./dto/update-valoracion-servicio.dto";
import { Usuario } from "src/usuario/entities/usuario.entity";

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
  createOrUpdate(
    //@Param("idTarjetaServicio") idTarjetaServicio: number,
    @Body() updateValoracionServicioDto: UpdateValoracionServicioDto,
  ) {
    return this.valoracionServicioService.createOrUpdate(
      updateValoracionServicioDto,
    );
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.valoracionServicioService.remove(+id);
  }
}
