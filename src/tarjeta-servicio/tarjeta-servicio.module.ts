import { Module } from '@nestjs/common';
import { TarjetaServicioService } from './tarjeta-servicio.service';
import { TarjetaServicioController } from './tarjeta-servicio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TarjetaServicio } from './entities/tarjeta-servicio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TarjetaServicio])],
  controllers: [TarjetaServicioController],
  providers: [TarjetaServicioService]
})
export class TarjetaServicioModule {}
