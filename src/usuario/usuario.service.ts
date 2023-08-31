import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuarioService {constructor(
  @InjectRepository(Usuario)
  private readonly usuarioRepository: Repository<Usuario>,
) {}

create(usuarioDto: CreateUsuarioDto) {
  const c = this.usuarioRepository.create(usuarioDto);
  return this.usuarioRepository.save(c);
}

findAll(): Promise<Usuario[]> {
  return this.usuarioRepository.find();
}

async findOne(id: number) {
  const c = await this.usuarioRepository.findOneBy({ idUsuario: id });
  if (c) return c;

  throw new HttpException(
    'No existe un usuario con ese id',
    HttpStatus.NOT_FOUND,
  );
}

async remove(id: number) {
  const r = await this.usuarioRepository.delete(id);

  console.log(
    `Remove, id: ${id}, result: ${r.affected ? 'Eliminado' : 'No Eliminado'}`,
  );
  if (r.affected)
    return new HttpException(`Remove, id: ${id}`, HttpStatus.OK);

  throw new HttpException(
    'No existe usuario con ese id',
    HttpStatus.NOT_FOUND,
  );
}

async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
  await this.findOne(id);

  try {
    const result = await this.usuarioRepository.update(
      { idUsuario: id },
      { ...updateUsuarioDto, idUsuario: id },
    );

    console.log(`Update, id: ${id}, result: ${result}`);

    return result;
  } catch (error) {
    console.log(error);
    throw new HttpException('no se pudo realizar la operacion', HttpStatus.NOT_IMPLEMENTED);
  }
}
}