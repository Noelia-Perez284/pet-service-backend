import { Module } from '@nestjs/common';
import { PerdidosYencontradoService } from './perdidos-yencontrados.service';
import { PerdidosYencontradosController } from './perdidos-yencontrados.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerdidosYencontrado } from './entities/perdidos-yencontrado.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  imports: [TypeOrmModule.forFeature([PerdidosYencontrado, Usuario]), UsuarioModule],
  controllers: [PerdidosYencontradosController],
  providers: [PerdidosYencontradoService]
})
export class PerdidosYencontradosModule {}
