import { Module } from '@nestjs/common';
import { TarjetaServicioService } from './tarjeta-servicio.service';
import { TarjetaServicioController } from './tarjeta-servicio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TarjetaServicio } from './entities/tarjeta-servicio.entity';
import { CategoriaModule } from 'src/categoria/categoria.module';
import { ProvinciaModule } from 'src/provincia/provincia.module';
import { ValoracionServicioModule } from 'src/valoracion-servicio/valoracion-servicio.module';

@Module({
  imports: [TypeOrmModule.forFeature([TarjetaServicio]), CategoriaModule, ProvinciaModule, ValoracionServicioModule],
  controllers: [TarjetaServicioController],
  providers: [TarjetaServicioService]
})
export class TarjetaServicioModule {}
