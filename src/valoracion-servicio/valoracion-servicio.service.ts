import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateValoracionServicioDto } from './dto/create-valoracion-servicio.dto';
import { UpdateValoracionServicioDto } from './dto/update-valoracion-servicio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ValoracionServicio } from './entities/valoracion-servicio.entity';
import { Repository } from 'typeorm';
import { TarjetaServicioService } from 'src/tarjeta-servicio/tarjeta-servicio.service';
import { TarjetaServicio } from '../tarjeta-servicio/entities/tarjeta-servicio.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable()
export class ValoracionServicioService {constructor(
  @InjectRepository(ValoracionServicio)
  private readonly valoracionServicioRepository: Repository<ValoracionServicio>,
  private tarjetaServicio: TarjetaServicioService,
  private usuario: UsuarioService
) {}

create(valoracionServicioDto: CreateValoracionServicioDto) {
  const c = this.valoracionServicioRepository.create(valoracionServicioDto);
  return this.valoracionServicioRepository.save(c);
}

findAll(): Promise<ValoracionServicio[]> {
  return this.valoracionServicioRepository.find();
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

async findOne(idUsuario: number, idTarjetaServicio: number, valoracionServicioDto: CreateValoracionServicioDto, UpdateValoracionServicioDto: UpdateValoracionServicioDto) {
  const tarjetaServicio = await this.tarjetaServicio.findOne(idTarjetaServicio)
  const usuario = await this.usuario.findOne(idUsuario)
  return this.valoracionServicioRepository.findOne({
    where: {
      idUsuario: usuario,
      idTarjetaServicio: tarjetaServicio
    }
  })

 

  return this.valoracionServicioRepository.findOne({
    where: {
      idValoracionServicio: id
    },
    relations: ['tarjeta-servicio']
  });

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
