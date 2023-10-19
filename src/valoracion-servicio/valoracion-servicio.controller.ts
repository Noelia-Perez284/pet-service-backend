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

  @Get("usuario/:id/tarjeta/:id")
  findOne(
    @Param("usuario") idUsuario: number,
    @Param("tarjeta") idTarjetaServicio: number,
  ) {
    return this.valoracionServicioService.findOne(idUsuario, idTarjetaServicio);
  }

  @Get("valoresTarjeta")
  votosYValoraciones() {
    return this.valoracionServicioService.votosYValoraciones();
  }

  @Put(":id")
  createOrUpdate(
    @Param("id") id: string,
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
