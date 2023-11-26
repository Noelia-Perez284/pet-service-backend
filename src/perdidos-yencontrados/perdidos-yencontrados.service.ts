import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePerdidosYencontradoDto } from './dto/create-perdidos-yencontrado.dto';
import { UpdatePerdidosYencontradoDto } from './dto/update-perdidos-yencontrado.dto';
import { PerdidosYencontrado } from './entities/perdidos-yencontrado.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class PerdidosYencontradoService {constructor(
  @InjectRepository(PerdidosYencontrado)
  private readonly perdidosYencontradoRepository: Repository<PerdidosYencontrado>,
  private usuarioService: UsuarioService,
) {}

  async create(perdidosYencontradoDto: CreatePerdidosYencontradoDto) {
  
    const contactoUsuario = await this.usuarioService.findOne(perdidosYencontradoDto.contactoUsuarioIdUsuario);
    const c = this.perdidosYencontradoRepository.create(perdidosYencontradoDto);
    c.contactoUsuario = contactoUsuario;
    
    return this.perdidosYencontradoRepository.save(c);
  }

findAll(): Promise<PerdidosYencontrado[]> {
  return this.perdidosYencontradoRepository.find();
}

async findOne(id: number) {
  const c = await this.perdidosYencontradoRepository.findOneBy({ idPerdidosYEncontrados: id });
  if (c) return c;

  throw new HttpException(
    'No existe un resultado con ese id',
    HttpStatus.NOT_FOUND,
  );
}

async remove(id: number) {
  const r = await this.perdidosYencontradoRepository.delete(id);

  console.log(
    `Remove, id: ${id}, result: ${r.affected ? 'Eliminado' : 'No Eliminado'}`,
  );
  if (r.affected)
    return new HttpException(`Remove, id: ${id}`, HttpStatus.OK);

  throw new HttpException(
    'No existe resultado con ese id',
    HttpStatus.NOT_FOUND,
  );
}

async update(id: number, updatePerdidosYencontradoDto: UpdatePerdidosYencontradoDto) {
  await this.findOne(id);

  try {
    const result = await this.perdidosYencontradoRepository.update(
      { idPerdidosYEncontrados: id },
      { ...updatePerdidosYencontradoDto, idPerdidosYEncontrados: id },
    );

    console.log(`Update, id: ${id}, result: ${result}`);

    return result;
  } catch (error) {
    console.log(error);
    throw new HttpException('no se pudo realizar la operacion', HttpStatus.NOT_IMPLEMENTED);
  }
}
}