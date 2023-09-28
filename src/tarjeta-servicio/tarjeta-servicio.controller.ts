import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { TarjetaServicioService } from "./tarjeta-servicio.service";
import { CreateTarjetaServicioDto } from "./dto/create-tarjeta-servicio.dto";
import { UpdateTarjetaServicioDto } from "./dto/update-tarjeta-servicio.dto";
import { Provincia } from "src/provincia/entities/provincia.entity";
import { ProvinciaService } from "src/provincia/provincia.service";

@Controller("tarjeta-servicio")
export class TarjetaServicioController {
  constructor(
    private readonly tarjetaServicioService: TarjetaServicioService
  ) {}

  @Post()
  create(@Body() createTarjetaServicioDto: CreateTarjetaServicioDto) {
    return this.tarjetaServicioService.create(createTarjetaServicioDto);
  }

  @Get()
  findAll() {
    return this.tarjetaServicioService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.tarjetaServicioService.findOne(+id);
  }

  @Get(":servicio")
  findByCategory(@Param(/* "idCategoria", */ "idProvincia") id: string) {
    return this.tarjetaServicioService.findByCategory();
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateTarjetaServicioDto: UpdateTarjetaServicioDto
  ) {
    return this.tarjetaServicioService.update(+id, updateTarjetaServicioDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.tarjetaServicioService.remove(+id);
  }
}
