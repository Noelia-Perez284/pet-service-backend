import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateTarjetaServicioDto } from "./dto/create-tarjeta-servicio.dto";
import { UpdateTarjetaServicioDto } from "./dto/update-tarjeta-servicio.dto";
import { TarjetaServicio } from "./entities/tarjeta-servicio.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoriaService } from "../categoria/categoria.service";
import { ProvinciaService } from "../provincia/provincia.service";

@Injectable()
export class TarjetaServicioService {
  constructor(
    @InjectRepository(TarjetaServicio)
    private readonly tarjetaServicioRepository: Repository<TarjetaServicio>,
    private CategoriaService: CategoriaService,
    private ProvinciaService: ProvinciaService,
  ) {}

  async create(CreateTarjetaServicioDto: CreateTarjetaServicioDto) {
    const categoria = await this.CategoriaService.findOne(
      CreateTarjetaServicioDto.idCategoria,
    );
    const provincia = await this.ProvinciaService.findOne(
      CreateTarjetaServicioDto.idProvincia,
    );

    if (!categoria)
      return new HttpException("categoria no encontrada", HttpStatus.NOT_FOUND);

    if (!provincia) {
      return new HttpException("Provincia no encontrada", HttpStatus.NOT_FOUND);
    }

    const tarjetaServicio = this.tarjetaServicioRepository.create(
      CreateTarjetaServicioDto,
    );
    tarjetaServicio.categoria = categoria;
    tarjetaServicio.provincia = provincia;
    return this.tarjetaServicioRepository.save(tarjetaServicio);
  }

  async findAll() {
    const results = await this.tarjetaServicioRepository.find({
      relations: ["categoria", "provincia", "valoraciones"],
    });
    const tarjetas = [];
    for (let i = 0; i < results.length; i++) {
      const votos = results[i].valoraciones.length;
      const tarjeta = results[i];
      let promedio = 0;
      function promediar() {
        for (let i = 0; i < votos; i++) {
          promedio = promedio + tarjeta.valoraciones[i].valoracion;
        }
        promedio = Math.floor(promedio / votos);
      }
      promediar();
      const tarjetaConValores = { ...tarjeta, votos, promedio };
      tarjetas.push(tarjetaConValores);
    }
    return tarjetas;
  }
  /**************************************************************** */
  async findOne(id: number) {
    const result = await this.tarjetaServicioRepository.findOne({
      where: {
        idTarjetaServicio: id,
      },
      relations: ["categoria", "provincia", "valoraciones"],
    });

    const votos = result.valoraciones.length;
    let promedio = 0;
    function promediar() {
      for (let i = 0; i < votos; i++) {
        promedio = promedio + result.valoraciones[i].valoracion;
      }
      promedio = Math.floor(promedio / votos);
    }
    promediar();

    const tarjeta = { ...result, votos, promedio };
    return tarjeta;
  }

  async findByCategoryAndProvince(idCategoria: number, idProvincia: number) {
    const categoria = await this.CategoriaService.findOne(idCategoria);
    const provincia = await this.ProvinciaService.findOne(idProvincia);

    if (!categoria || !provincia) {
      throw new HttpException(
        "Categoría o provincia no encontrada",
        HttpStatus.NOT_FOUND,
      );
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

    throw new HttpException(
      "No se encontraron servicios para esta categoría y provincia",
      HttpStatus.NOT_FOUND,
    );
  }

  /********************************************************** */
  /* async tarjetasYValoraciones(/* idTarjetaServicio: number ): Promise<any> {
    return (
      this.tarjetaServicioRepository
        .createQueryBuilder("tarjetaYValoracion")
        .select([
          "tarjetaServicio.*",
          "valoraciones.tarjetaServicioIdTarjetaServicio AS id, COUNT(valoraciones.valoracion) AS votos , AVG(valoraciones.valoracion) AS promedio",
        ])
          .where("valoraciones.tarjetaServicioIdTarjetaServicio = :id ", {
        id: idTarjetaServicio, 
      }) 
        .innerJoin(
          "valoraciones",
          "tarjetaServicio",
          "valoraciones.tarjetaServicioIdTarjetaServicio = tarjetaServicio.idTarjetaServicio ",
        )
        .groupBy("valoraciones.tarjetaServicioIdTarjetaServicio")
        .getRawMany()
    );
  } */
  /**************************************************************** */
  async remove(id: number) {
    const r = await this.tarjetaServicioRepository.delete(id);

    console.log(
      `Remove, id: ${id}, result: ${r.affected ? "Eliminado" : "No Eliminado"}`,
    );
    if (r.affected)
      return new HttpException(`Remove, id: ${id}`, HttpStatus.OK);

    throw new HttpException(
      "No existe tarjeta con ese id",
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
      throw new HttpException(
        "no se pudo realizar la operacion",
        HttpStatus.NOT_IMPLEMENTED,
      );
    }
  }
}
