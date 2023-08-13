import { Test, TestingModule } from '@nestjs/testing';
import { TarjetaServicioController } from './tarjeta-servicio.controller';
import { TarjetaServicioService } from './tarjeta-servicio.service';

describe('TarjetaServicioController', () => {
  let controller: TarjetaServicioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TarjetaServicioController],
      providers: [TarjetaServicioService],
    }).compile();

    controller = module.get<TarjetaServicioController>(TarjetaServicioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
