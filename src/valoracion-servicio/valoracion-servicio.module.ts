import { Module } from '@nestjs/common';
import { ValoracionServicioService } from './valoracion-servicio.service';
import { ValoracionServicioController } from './valoracion-servicio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValoracionServicio } from './entities/valoracion-servicio.entity';
import { TarjetaServicioModule } from 'src/tarjeta-servicio/tarjeta-servicio.module';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  imports:[TypeOrmModule.forFeature([ValoracionServicio]), TarjetaServicioModule, UsuarioModule],
  controllers: [ValoracionServicioController],
  providers: [ValoracionServicioService]
})
export class ValoracionServicioModule {}
