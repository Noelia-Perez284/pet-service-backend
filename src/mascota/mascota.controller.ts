import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { MascotaService } from "./mascota.service";
import { CreateMascotaDto } from "./dto/create-mascota.dto";
import { UpdateMascotaDto } from "./dto/update-mascota.dto";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("mascota")
export class MascotaController {
  constructor(private readonly mascotaService: MascotaService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  create(@Body() createMascotaDto: CreateMascotaDto) {
    return this.mascotaService.create(createMascotaDto);
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
