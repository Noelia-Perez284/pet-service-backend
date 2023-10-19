import { Module } from '@nestjs/common';
import { VistaService } from './vista.service';
import { VistaController } from './vista.controller';
import { datosServicio } from './entities/vista.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([datosServicio])],
  controllers: [VistaController],
  providers: [VistaService]
})
export class VistaModule {}
