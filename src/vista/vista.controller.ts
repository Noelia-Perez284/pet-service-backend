import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { VistaService } from "./vista.service";
import { CreateVistaDto } from "./dto/create-vista.dto";
import { UpdateVistaDto } from "./dto/update-vista.dto";

@Controller("vista")
export class VistaController {
  constructor(private readonly vistaService: VistaService) {}

  /*  @Post()
  create(@Body() createVistaDto: CreateVistaDto) {
    return this.vistaService.create(createVistaDto);
  } */

  @Get()
  findAll() {
    return this.vistaService.findAll();
  }

  @Get(":nombre_provincia")
  findBy(@Param("nombre_provincia") nombre_provincia: string) {
    return this.vistaService.findByProvincia(nombre_provincia);
  }

 
  /*
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVistaDto: UpdateVistaDto) {
    return this.vistaService.update(+id, updateVistaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vistaService.remove(+id);
  } */
}
