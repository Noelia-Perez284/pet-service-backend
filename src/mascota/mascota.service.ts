import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMascotaDto } from './dto/create-mascota.dto';
import { UpdateMascotaDto } from './dto/update-mascota.dto';
import { Mascota } from './entities/mascota.entity';

@Injectable()
export class MascotaService {constructor(
  @InjectRepository(Mascota)
  private readonly mascotaRepository: Repository<Mascota>,
) {}

create(mascotaDto: CreateMascotaDto) {
  const c = this.mascotaRepository.create(mascotaDto);
  return this.mascotaRepository.save(c);
}

findAll(): Promise<Mascota[]> {
  return this.mascotaRepository.find();
}

async findOne(id: number) {
  const c = await this.mascotaRepository.findOneBy({ idMascota: id });
  if (c) return c;

  throw new HttpException(
    'No existe una mascota con ese id',
    HttpStatus.NOT_FOUND,
  );
}

async remove(id: number) {
  const r = await this.mascotaRepository.delete(id);

  console.log(
    `Remove, id: ${id}, result: ${r.affected ? 'Eliminado' : 'No Eliminado'}`,
  );
  if (r.affected)
    return new HttpException(`Remove, id: ${id}`, HttpStatus.OK);

  throw new HttpException(
    'No existe mascota con ese id',
    HttpStatus.NOT_FOUND,
  );
}

async update(id: number, updateMascotaDto: UpdateMascotaDto) {
  await this.findOne(id);

  try {
    const result = await this.mascotaRepository.update(
      { idMascota: id },
      { ...updateMascotaDto, idMascota: id },
    );

    console.log(`Update, id: ${id}, result: ${result}`);

    return result;
  } catch (error) {
    console.log(error);
    throw new HttpException('no se pudo realizar la operacion', HttpStatus.NOT_IMPLEMENTED);
  }
}
}