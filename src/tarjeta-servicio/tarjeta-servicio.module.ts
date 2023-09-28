import { Module } from '@nestjs/common';
import { TarjetaServicioService } from './tarjeta-servicio.service';
import { TarjetaServicioController } from './tarjeta-servicio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TarjetaServicio } from './entities/tarjeta-servicio.entity';
import { Categoria } from 'src/categoria/entities/categoria.entity';
import { Provincia } from 'src/provincia/entities/provincia.entity';
import { ValoracionServicio } from 'src/valoracion-servicio/entities/valoracion-servicio.entity';
import { CategoriaModule } from 'src/categoria/categoria.module';
import { ProvinciaModule } from 'src/provincia/provincia.module';

@Module({
  imports: [TypeOrmModule.forFeature([TarjetaServicio, Categoria, Provincia, ValoracionServicio]),CategoriaModule, ProvinciaModule],
  controllers: [TarjetaServicioController],
  providers: [TarjetaServicioService]
})
export class TarjetaServicioModule {}
