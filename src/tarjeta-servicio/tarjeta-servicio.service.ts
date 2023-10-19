import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTarjetaServicioDto } from './dto/create-tarjeta-servicio.dto';
import { UpdateTarjetaServicioDto } from './dto/update-tarjeta-servicio.dto';
import { TarjetaServicio } from './entities/tarjeta-servicio.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TarjetaServicioService {constructor(
  @InjectRepository(TarjetaServicio)
  private readonly tarjetaServicioRepository: Repository<TarjetaServicio>,
) {}

create(tarjetaServicioDto: CreateTarjetaServicioDto) {
  const c = this.tarjetaServicioRepository.create(tarjetaServicioDto);
  return this.tarjetaServicioRepository.save(c);
}

findAll(): Promise<TarjetaServicio[]> {
  return this.tarjetaServicioRepository.find();
}

async findOne(id: number) {
  const c = await this.tarjetaServicioRepository.findOneBy({ idTarjetaServicio: id });
  if (c) return c;

  throw new HttpException(
    'No existe una tarjeta con ese id',
    HttpStatus.NOT_FOUND,
  );
}

async remove(id: number) {
  const r = await this.tarjetaServicioRepository.delete(id);

  console.log(
    `Remove, id: ${id}, result: ${r.affected ? 'Eliminado' : 'No Eliminado'}`,
  );
  if (r.affected)
    return new HttpException(`Remove, id: ${id}`, HttpStatus.OK);

  throw new HttpException(
    'No existe tarjeta con ese id',
    HttpStatus.NOT_FOUND,
  );
}

async update(id: number, updateTarjetaServicioDto: UpdateTarjetaServicioDto) {
  await this.findOne(id);

  try {
    const result = await this.tarjetaServicioRepository.update(
      { idTarjetaServicio: id },
      { ...updateTarjetaServicioDto, idTarjetaServicio: id },
    );

    console.log(`Update, id: ${id}, result: ${result}`);

    return result;
  } catch (error) {
    console.log(error);
    throw new HttpException('no se pudo realizar la operacion', HttpStatus.NOT_IMPLEMENTED);
  }
}


}