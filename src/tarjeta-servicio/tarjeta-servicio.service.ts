import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateTarjetaServicioDto } from "./dto/create-tarjeta-servicio.dto";
import { UpdateTarjetaServicioDto } from "./dto/update-tarjeta-servicio.dto";
import { TarjetaServicio } from "./entities/tarjeta-servicio.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Categoria } from "src/categoria/entities/categoria.entity";
import { Provincia } from "src/provincia/entities/provincia.entity";
import { CategoriaService } from '../categoria/categoria.service';
import { ProvinciaService } from '../provincia/provincia.service';


@Injectable()
export class TarjetaServicioService {
  constructor(
    @InjectRepository(TarjetaServicio)
    private readonly tarjetaServicioRepository: Repository<TarjetaServicio>,
    private CategoriaService: CategoriaService,
    private ProvinciaService: ProvinciaService,
  ) {}


async create (CreateTarjetaServicioDto: CreateTarjetaServicioDto){

  const categoria = await this.CategoriaService.findOne (CreateTarjetaServicioDto.idCategoria);
  const provincia = await this.ProvinciaService.findOne (CreateTarjetaServicioDto.idProvincia)

  if (!categoria)
  return new HttpException ('categoria no encontrada', HttpStatus.NOT_FOUND);

  if (!provincia) {
    return new HttpException('Provincia no encontrada', HttpStatus.NOT_FOUND);
  }

const tarjetaServicio = this.tarjetaServicioRepository.create(CreateTarjetaServicioDto);
tarjetaServicio.categoria = categoria;
tarjetaServicio.provincia = provincia;
return this.tarjetaServicioRepository.save(tarjetaServicio)
}

findAll() {
  return this.tarjetaServicioRepository.find({
    relations: ['categoria', 'provincia']
  });
}

findOne(id: number) {
  return this.tarjetaServicioRepository.findOne({
    where: {
      idTarjetaServicio: id
    },
    relations: ['categoria', 'provincia']
  });
}


async findByCategoryAndProvince(idCategoria: number, idProvincia: number) {
  const categoria = await this.CategoriaService.findOne(idCategoria);
  const provincia = await this.ProvinciaService.findOne(idProvincia);

  if (!categoria || !provincia) {
    throw new HttpException('Categoría o provincia no encontrada', HttpStatus.NOT_FOUND);
  }

  const servicios = await this.tarjetaServicioRepository.find({
    where: {
      categoria: categoria,
      provincia: provincia,
    },
  });

  if (servicios.length > 0) {
    return servicios;
  }

  throw new HttpException('No se encontraron servicios para esta categoría y provincia', HttpStatus.NOT_FOUND);
}


async remove(id: number) {
  const r = await this.tarjetaServicioRepository.delete(id);

  console.log(
    `Remove, id: ${id}, result: ${r.affected ? "Eliminado" : "No Eliminado"}`
  );
  if (r.affected)
    return new HttpException(`Remove, id: ${id}`, HttpStatus.OK);

  throw new HttpException(
    "No existe tarjeta con ese id",
    HttpStatus.NOT_FOUND
  );
}
async update(id: number, updateTarjetaServicioDto: UpdateTarjetaServicioDto) {
  await this.findOne(id);

  try {
    const result = await this.tarjetaServicioRepository.update(
      { idTarjetaServicio: id },
      { ...updateTarjetaServicioDto, idTarjetaServicio: id }
    );

    console.log(`Update, id: ${id}, result: ${result}`);

    return result;
  } catch (error) {
    console.log(error);
    throw new HttpException(
      "no se pudo realizar la operacion",
      HttpStatus.NOT_IMPLEMENTED
    );
  }
}
}
