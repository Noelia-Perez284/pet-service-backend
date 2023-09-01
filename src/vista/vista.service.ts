import { Injectable } from "@nestjs/common";
import { CreateVistaDto } from "./dto/create-vista.dto";
import { UpdateVistaDto } from "./dto/update-vista.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { datosServicio } from "./entities/vista.entity";
import { Repository } from "typeorm";

@Injectable()
export class VistaService {
  constructor(
    @InjectRepository(datosServicio)
    private datosServicioRepository: Repository<datosServicio>
  ) {}

  async findAll(): Promise<datosServicio[]> {
    return this.datosServicioRepository.find();
  }
}
/* findOne(id: number) {
    return `This action returns a #${id} vista`;
  }

  update(id: number, updateVistaDto: UpdateVistaDto) {
    return `This action updates a #${id} vista`;
  }

  remove(id: number) {
    return `This action removes a #${id} vista`;
  } 
}*/
