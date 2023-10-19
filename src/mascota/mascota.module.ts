import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MascotaService } from "./mascota.service";
import { MascotaController } from "./mascota.controller";
import { Mascota } from "./entities/mascota.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { UsuarioModule } from "src/usuario/usuario.module";

@Module({
  imports: [TypeOrmModule.forFeature([Mascota, Usuario]), UsuarioModule],
  controllers: [MascotaController],
  providers: [MascotaService],
  exports: [MascotaService],
})
export class MascotaModule {}
