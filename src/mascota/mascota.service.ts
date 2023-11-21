import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateMascotaDto } from "./dto/create-mascota.dto";
import { UpdateMascotaDto } from "./dto/update-mascota.dto";
import { Mascota } from "./entities/mascota.entity";
import { UsuarioService } from "src/usuario/usuario.service";

@Injectable()
export class MascotaService {
  constructor(
    @InjectRepository(Mascota)
    private readonly mascotaRepository: Repository<Mascota>,
    private usuarioService: UsuarioService,
  ) { }
  
  
  /******************************************** */
  async create(mascotaDto: CreateMascotaDto) {
    try {
      console.log("entro al servicio");

      const duenio = await this.usuarioService.findOne(mascotaDto.duenioIdUsuario);
      const mascota = this.mascotaRepository.create(mascotaDto);
      mascota.duenio = duenio;
      return this.mascotaRepository.save(mascota);
    } catch (error) {
      console.log(error);
      throw new HttpException('Ocurrió un error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  /******************************************** */
  findAll(): Promise<Mascota[]> {
    return this.mascotaRepository.find();
  }

  async findOne(id: number) {
    const mascota = await this.mascotaRepository.findOneBy({ idMascota: id });
    if (mascota) return mascota;

    throw new HttpException(
      "No existe una mascota con ese id",
      HttpStatus.NOT_FOUND,
    );
  }

  /************************************************* */
  async findByUsuario(idUsuario: number) {
    const usuario = await this.usuarioService.findOne(idUsuario);
    const mascotas = await this.mascotaRepository.find({
      where: {
        duenio: usuario,
      },
    });
    if (usuario && mascotas) return mascotas;
    else if (!usuario)
      throw new HttpException(
        "No se encontro el usuario",
        HttpStatus.NOT_FOUND,
      );
    else if (mascotas.length < 0)
      throw new HttpException(
        "No se encontraron mascotas",
        HttpStatus.NOT_FOUND,
      );
  }

  /********************************************************** */

  async remove(id: number) {
    const r = await this.mascotaRepository.delete(id);

    console.log(
      `Remove, id: ${id}, result: ${r.affected ? "Eliminado" : "No Eliminado"}`,
    );
    if (r.affected)
      return new HttpException(`Remove, id: ${id}`, HttpStatus.OK);

    throw new HttpException(
      "No existe mascota con ese id",
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
      throw new HttpException(
        "no se pudo realizar la operacion",
        HttpStatus.NOT_IMPLEMENTED,
      );
    }
  }
}
