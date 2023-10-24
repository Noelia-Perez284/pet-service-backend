import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateValoracionServicioDto } from "./dto/create-valoracion-servicio.dto";
import { UpdateValoracionServicioDto } from "./dto/update-valoracion-servicio.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { ValoracionServicio } from "./entities/valoracion-servicio.entity";
import { Repository } from "typeorm";
import { TarjetaServicioService } from "../tarjeta-servicio/tarjeta-servicio.service";
import { UsuarioService } from "../usuario/usuario.service";

@Injectable()
export class ValoracionServicioService {
  constructor(
    @InjectRepository(ValoracionServicio)
    private readonly valoracionServicioRepository: Repository<ValoracionServicio>,
    private tarjetaServicio: TarjetaServicioService,
    private usuario: UsuarioService,
  ) {}

  findAll(): Promise<ValoracionServicio[]> {
    return this.valoracionServicioRepository.find();
  }

  async createOrUpdate(
    updateValoracionServicioDto: UpdateValoracionServicioDto,
  ) {
    const idUsuario = await this.usuario.findOne(
      updateValoracionServicioDto.idUsuario,
    );

    const idTarjetaServicio = await this.tarjetaServicio.findOne(
      updateValoracionServicioDto.idTarjetaServicio,
    );

    const valoracion = await this.findOne(
      updateValoracionServicioDto.idUsuario,
      updateValoracionServicioDto.idTarjetaServicio,
    );
    if (!valoracion) {
      const c = this.valoracionServicioRepository.create(
        updateValoracionServicioDto,
      );
      c.usuario = idUsuario;
      c.tarjetaServicio = idTarjetaServicio;
      return this.valoracionServicioRepository.save(c);
    }
    try {
      const result = await this.valoracionServicioRepository.update(
        { idValoracionServicio: valoracion.idValoracionServicio },
        {
          ...updateValoracionServicioDto,
          idValoracionServicio: valoracion.idValoracionServicio,
        },
      );

      console.log(
        `Update, id: ${valoracion.idValoracionServicio}, result: ${result}`,
      );

      return result;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        "no se pudo realizar la operacion",
        HttpStatus.NOT_IMPLEMENTED,
      );
    }
  }

  /**************************************************************** */
  //funcion que devuelve las querys de votos y promedio por cada tarjeta
  async votosYValoraciones(/* idTarjetaServicio: number */): Promise<any> {
    return (
      this.valoracionServicioRepository
        .createQueryBuilder("valoraciones")
        .select(
          "valoraciones.tarjetaServicioIdTarjetaServicio AS id, COUNT(valoraciones.valoracion) AS votos , AVG(valoraciones.valoracion) AS promedio",
        )
        /* .where("valoraciones.tarjetaServicioIdTarjetaServicio = :id ", {
        id: idTarjetaServicio,
      }) */
        .groupBy("valoraciones.tarjetaServicioIdTarjetaServicio")
        .getRawMany()
    );
  }

  /***************************************************************** */

  async findOne(idUsuario: number, idTarjetaServicio: number) {
    return this.valoracionServicioRepository.findOne({
      where: {
        usuario: { idUsuario: idUsuario },
        tarjetaServicio: { idTarjetaServicio: idTarjetaServicio },
      },
    });
  }
  async remove(id: number) {
    const r = await this.valoracionServicioRepository.delete(id);

    console.log(
      `Remove, id: ${id}, result: ${r.affected ? "Eliminado" : "No Eliminado"}`,
    );
    if (r.affected)
      return new HttpException(`Remove, id: ${id}`, HttpStatus.OK);

    throw new HttpException(
      "No existe valoracion con ese id",
      HttpStatus.NOT_FOUND,
    );
  }
}
