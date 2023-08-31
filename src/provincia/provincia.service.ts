import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProvinciaDto } from './dto/create-provincia.dto';
import { UpdateProvinciaDto } from './dto/update-provincia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Provincia } from './entities/provincia.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProvinciaService {constructor(
  @InjectRepository(Provincia)
  private readonly provinciaRepository: Repository<Provincia>,
) {}

create(provinciaDto: CreateProvinciaDto) {
  const c = this.provinciaRepository.create(provinciaDto);
  return this.provinciaRepository.save(c);
}

findAll(): Promise<Provincia[]> {
  return this.provinciaRepository.find();
}

async findOne(id: number) {
  const c = await this.provinciaRepository.findOneBy({ idProvincia: id });
  if (c) return c;

  throw new HttpException(
    'No existe una provincia con ese id',
    HttpStatus.NOT_FOUND,
  );
}

async remove(id: number) {
  const r = await this.provinciaRepository.delete(id);

  console.log(
    `Remove, id: ${id}, result: ${r.affected ? 'Eliminado' : 'No Eliminado'}`,
  );
  if (r.affected)
    return new HttpException(`Remove, id: ${id}`, HttpStatus.OK);

  throw new HttpException(
    'No existe provincia con ese id',
    HttpStatus.NOT_FOUND,
  );
}

async update(id: number, updateProvinciaDto: UpdateProvinciaDto) {
  await this.findOne(id);

  try {
    const result = await this.provinciaRepository.update(
      { idProvincia: id },
      { ...updateProvinciaDto, idProvincia: id },
    );

    console.log(`Update, id: ${id}, result: ${result}`);

    return result;
  } catch (error) {
    console.log(error);
    throw new HttpException('no se pudo realizar la operacion', HttpStatus.NOT_IMPLEMENTED);
  }
}
}