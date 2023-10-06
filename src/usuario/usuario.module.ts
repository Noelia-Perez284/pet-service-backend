/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { UsuarioService } from "./usuario.service";
import { UsuarioController } from "./usuario.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Usuario } from "./entities/usuario.entity";
import { Mascota } from "src/mascota/entities/mascota.entity";
import { ValoracionServicio } from "src/valoracion-servicio/entities/valoracion-servicio.entity";
import { PerdidosYencontrado } from "src/perdidos-yencontrados/entities/perdidos-yencontrado.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Usuario,
      Mascota,
      ValoracionServicio,
      PerdidosYencontrado,
    ]), 
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService]
})
export class UsuarioModule {}
