import { Test, TestingModule } from '@nestjs/testing';
import { PerdidosYencontradosController } from './perdidos-yencontrados.controller';
import { PerdidosYencontradosService } from './perdidos-yencontrados.service';

describe('PerdidosYencontradosController', () => {
  let controller: PerdidosYencontradosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PerdidosYencontradosController],
      providers: [PerdidosYencontradosService],
    }).compile();

    controller = module.get<PerdidosYencontradosController>(PerdidosYencontradosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
