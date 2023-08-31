import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaService } from './categoria.service';
import { CategoriaController } from './categoria.controller';
import { Categoria } from './entities/categoria.entity';
import { TarjetaServicio } from 'src/tarjeta-servicio/entities/tarjeta-servicio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Categoria, TarjetaServicio])],
  controllers: [CategoriaController],
  providers: [CategoriaService]
})
export class CategoriaModule {}
