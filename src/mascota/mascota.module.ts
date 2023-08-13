import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MascotaService } from './mascota.service';
import { MascotaController } from './mascota.controller';
import { Mascota } from './entities/mascota.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Mascota])],
  controllers: [MascotaController],
  providers: [MascotaService]
})
export class MascotaModule {}
