import { Test, TestingModule } from '@nestjs/testing';
import { ValoracionServicioController } from './valoracion-servicio.controller';
import { ValoracionServicioService } from './valoracion-servicio.service';

describe('ValoracionServicioController', () => {
  let controller: ValoracionServicioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ValoracionServicioController],
      providers: [ValoracionServicioService],
    }).compile();

    controller = module.get<ValoracionServicioController>(ValoracionServicioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
