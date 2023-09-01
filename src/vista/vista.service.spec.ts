import { Test, TestingModule } from '@nestjs/testing';
import { VistaService } from './vista.service';

describe('VistaService', () => {
  let service: VistaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VistaService],
    }).compile();

    service = module.get<VistaService>(VistaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
