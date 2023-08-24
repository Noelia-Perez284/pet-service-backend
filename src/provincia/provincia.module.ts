import { Module } from '@nestjs/common';
import { ProvinciaService } from './provincia.service';
import { ProvinciaController } from './provincia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provincia } from './entities/provincia.entity';
import { TarjetaServicio } from 'src/tarjeta-servicio/entities/tarjeta-servicio.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Provincia, TarjetaServicio])],
  controllers: [ProvinciaController],
  providers: [ProvinciaService]
})
export class ProvinciaModule {}
