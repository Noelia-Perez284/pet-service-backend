import { Test, TestingModule } from '@nestjs/testing';
import { ValoracionServicioService } from './valoracion-servicio.service';

describe('ValoracionServicioService', () => {
  let service: ValoracionServicioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValoracionServicioService],
    }).compile();

    service = module.get<ValoracionServicioService>(ValoracionServicioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
