import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { MascotaModule } from 'src/mascota/mascota.module';
import { ValoracionServicioModule } from 'src/valoracion-servicio/valoracion-servicio.module';
import { PerdidosYencontradosModule } from 'src/perdidos-yencontrados/perdidos-yencontrados.module';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario]), MascotaModule, ValoracionServicioModule, PerdidosYencontradosModule],
  controllers: [UsuarioController],
  providers: [UsuarioService]
})
export class UsuarioModule {}
