import { PartialType } from '@nestjs/mapped-types';
import { CreatePerdidosYencontradoDto } from './create-perdidos-yencontrado.dto';

export class UpdatePerdidosYencontradoDto extends PartialType(CreatePerdidosYencontradoDto) {}
