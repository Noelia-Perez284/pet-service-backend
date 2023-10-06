import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ValoracionServicioService } from './valoracion-servicio.service';
import { CreateValoracionServicioDto } from './dto/create-valoracion-servicio.dto';
import { UpdateValoracionServicioDto } from './dto/update-valoracion-servicio.dto';

@Controller('valoracion-servicio')
export class ValoracionServicioController {
  constructor(private readonly valoracionServicioService: ValoracionServicioService) {}


  @Get()
  findAll() {
    return this.valoracionServicioService.findAll();
  }


  @Put(':id')
  createOrUpdate(@Param('id') id: string, @Body() updateValoracionServicioDto: UpdateValoracionServicioDto) {
    return this.valoracionServicioService.createOrUpdate(updateValoracionServicioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.valoracionServicioService.remove(+id);
  }
}
