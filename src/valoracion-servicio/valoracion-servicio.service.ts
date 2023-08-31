import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateValoracionServicioDto } from './dto/create-valoracion-servicio.dto';
import { UpdateValoracionServicioDto } from './dto/update-valoracion-servicio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ValoracionServicio } from './entities/valoracion-servicio.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ValoracionServicioService {constructor(
  @InjectRepository(ValoracionServicio)
  private readonly valoracionServicioRepository: Repository<ValoracionServicio>,
) {}

create(valoracionServicioDto: CreateValoracionServicioDto) {
  const c = this.valoracionServicioRepository.create(valoracionServicioDto);
  return this.valoracionServicioRepository.save(c);
}

findAll(): Promise<ValoracionServicio[]> {
  return this.valoracionServicioRepository.find();
}

async findOne(id: number) {
  const c = await this.valoracionServicioRepository.findOneBy({ idValoracionServicio: id });
  if (c) return c;

  throw new HttpException(
    'No existe una valoracion con ese id',
    HttpStatus.NOT_FOUND,
  );
}

async remove(id: number) {
  const r = await this.valoracionServicioRepository.delete(id);

  console.log(
    `Remove, id: ${id}, result: ${r.affected ? 'Eliminado' : 'No Eliminado'}`,
  );
  if (r.affected)
    return new HttpException(`Remove, id: ${id}`, HttpStatus.OK);

  throw new HttpException(
    'No existe valoracion con ese id',
    HttpStatus.NOT_FOUND,
  );
}

async update(id: number, updateValoracionServicioDto: UpdateValoracionServicioDto) {
  await this.findOne(id);

  try {
    const result = await this.valoracionServicioRepository.update(
      { idValoracionServicio: id },
      { ...updateValoracionServicioDto, idValoracionServicio: id },
    );

    console.log(`Update, id: ${id}, result: ${result}`);

    return result;
  } catch (error) {
    console.log(error);
    throw new HttpException('no se pudo realizar la operacion', HttpStatus.NOT_IMPLEMENTED);
  }
}
}