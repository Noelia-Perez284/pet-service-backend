import { Module } from '@nestjs/common';
import { ValoracionServicioService } from './valoracion-servicio.service';
import { ValoracionServicioController } from './valoracion-servicio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValoracionServicio } from './entities/valoracion-servicio.entity';
import { TarjetaServicio } from 'src/tarjeta-servicio/entities/tarjeta-servicio.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ValoracionServicio, TarjetaServicio, Usuario])],
  controllers: [ValoracionServicioController],
  providers: [ValoracionServicioService]
})
export class ValoracionServicioModule {}
