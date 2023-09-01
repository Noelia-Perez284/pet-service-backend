import { Test, TestingModule } from '@nestjs/testing';
import { VistaController } from './vista.controller';
import { VistaService } from './vista.service';

describe('VistaController', () => {
  let controller: VistaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VistaController],
      providers: [VistaService],
    }).compile();

    controller = module.get<VistaController>(VistaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
