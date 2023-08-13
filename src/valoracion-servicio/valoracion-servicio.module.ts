import { Module } from '@nestjs/common';
import { ValoracionServicioService } from './valoracion-servicio.service';
import { ValoracionServicioController } from './valoracion-servicio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValoracionServicio } from './entities/valoracion-servicio.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ValoracionServicio])],
  controllers: [ValoracionServicioController],
  providers: [ValoracionServicioService]
})
export class ValoracionServicioModule {}
