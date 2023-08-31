import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';

@Injectable()
export class CategoriaService {constructor(
  @InjectRepository(Categoria)
  private readonly categoriaRepository: Repository<Categoria>,
) {}

create(categoriaDto: CreateCategoriaDto) {
  const c = this.categoriaRepository.create(categoriaDto);
  return this.categoriaRepository.save(c);
}

findAll(): Promise<Categoria[]> {
  return this.categoriaRepository.find();
}

async findOne(id: number) {
  const c = await this.categoriaRepository.findOneBy({ idCategoria: id });
  if (c) return c;

  throw new HttpException(
    'No existe una categoria con ese id',
    HttpStatus.NOT_FOUND,
  );
}

async remove(id: number) {
  const r = await this.categoriaRepository.delete(id);

  console.log(
    `Remove, id: ${id}, result: ${r.affected ? 'Eliminado' : 'No Eliminado'}`,
  );
  if (r.affected)
    return new HttpException(`Remove, id: ${id}`, HttpStatus.OK);

  throw new HttpException(
    'No existe categoria con ese id',
    HttpStatus.NOT_FOUND,
  );
}

async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
  await this.findOne(id);

  try {
    const result = await this.categoriaRepository.update(
      { idCategoria: id },
      { ...updateCategoriaDto, idCategoria: id },
    );

    console.log(`Update, id: ${id}, result: ${result}`);

    return result;
  } catch (error) {
    console.log(error);
    throw new HttpException('no se pudo realizar la operacion', HttpStatus.NOT_IMPLEMENTED);
  }
}
}