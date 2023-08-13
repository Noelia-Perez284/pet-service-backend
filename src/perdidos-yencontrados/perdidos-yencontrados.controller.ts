import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PerdidosYencontradosService } from './perdidos-yencontrados.service';
import { CreatePerdidosYencontradoDto } from './dto/create-perdidos-yencontrado.dto';
import { UpdatePerdidosYencontradoDto } from './dto/update-perdidos-yencontrado.dto';

@Controller('perdidos-yencontrados')
export class PerdidosYencontradosController {
  constructor(private readonly perdidosYencontradosService: PerdidosYencontradosService) {}

  @Post()
  create(@Body() createPerdidosYencontradoDto: CreatePerdidosYencontradoDto) {
    return this.perdidosYencontradosService.create(createPerdidosYencontradoDto);
  }

  @Get()
  findAll() {
    return this.perdidosYencontradosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.perdidosYencontradosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePerdidosYencontradoDto: UpdatePerdidosYencontradoDto) {
    return this.perdidosYencontradosService.update(+id, updatePerdidosYencontradoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.perdidosYencontradosService.remove(+id);
  }
}
