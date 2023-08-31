import { Test, TestingModule } from '@nestjs/testing';
import { TarjetaServicioService } from './tarjeta-servicio.service';

describe('TarjetaServicioService', () => {
  let service: TarjetaServicioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TarjetaServicioService],
    }).compile();

    service = module.get<TarjetaServicioService>(TarjetaServicioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
