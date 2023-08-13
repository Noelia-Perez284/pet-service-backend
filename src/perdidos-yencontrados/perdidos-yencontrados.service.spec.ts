import { Test, TestingModule } from '@nestjs/testing';
import { PerdidosYencontradosService } from './perdidos-yencontrados.service';

describe('PerdidosYencontradosService', () => {
  let service: PerdidosYencontradosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PerdidosYencontradosService],
    }).compile();

    service = module.get<PerdidosYencontradosService>(PerdidosYencontradosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
