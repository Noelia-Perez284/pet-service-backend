import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from "@nestjs/common";
import { TarjetaServicioService } from "./tarjeta-servicio.service";
import { CreateTarjetaServicioDto } from "./dto/create-tarjeta-servicio.dto";
import { UpdateTarjetaServicioDto } from "./dto/update-tarjeta-servicio.dto";
import { Provincia } from "src/provincia/entities/provincia.entity";

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

  @Get('categoria/:idCategoria/provincia/:idProvincia')
  async findByCategoryAndProvince(
    @Param('idCategoria', ParseIntPipe) idCategoria: number,
    @Param('idProvincia', ParseIntPipe) idProvincia: number,
  ) {
    try {
      const servicios = await this.tarjetaServicioService.findByCategoryAndProvince(
        idCategoria,
        idProvincia,
      );
      return { data: servicios, message: 'Servicios encontrados' };
    } catch (error) {
      return { error: error.message };
    }
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
