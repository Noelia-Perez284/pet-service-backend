import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ValoracionServicioService } from './valoracion-servicio.service';
import { CreateValoracionServicioDto } from './dto/create-valoracion-servicio.dto';
import { UpdateValoracionServicioDto } from './dto/update-valoracion-servicio.dto';

@Controller('valoracion-servicio')
export class ValoracionServicioController {
  constructor(private readonly valoracionServicioService: ValoracionServicioService) {}

  @Post()
  create(@Body() createValoracionServicioDto: CreateValoracionServicioDto) {
    return this.valoracionServicioService.create(createValoracionServicioDto);
  }

  @Get()
  findAll() {
    return this.valoracionServicioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.valoracionServicioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateValoracionServicioDto: UpdateValoracionServicioDto) {
    return this.valoracionServicioService.update(+id, updateValoracionServicioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.valoracionServicioService.remove(+id);
  }
}
