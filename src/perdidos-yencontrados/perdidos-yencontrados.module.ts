import { Module } from '@nestjs/common';
import { PerdidosYencontradoService } from './perdidos-yencontrados.service';
import { PerdidosYencontradosController } from './perdidos-yencontrados.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerdidosYencontrado } from './entities/perdidos-yencontrado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PerdidosYencontrado])],
  controllers: [PerdidosYencontradosController],
  providers: [PerdidosYencontradoService]
})
export class PerdidosYencontradosModule {}
