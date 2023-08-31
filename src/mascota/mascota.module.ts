import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MascotaService } from './mascota.service';
import { MascotaController } from './mascota.controller';
import { Mascota } from './entities/mascota.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Mascota, Usuario])],
  controllers: [MascotaController],
  providers: [MascotaService]
})
export class MascotaModule {}
