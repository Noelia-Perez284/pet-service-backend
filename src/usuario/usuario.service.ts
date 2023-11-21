import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async create(usuarioDto: CreateUsuarioDto): Promise<Usuario> {
    // Hasheamos la contraseña
    const hashedPassword = await bcrypt.hash(usuarioDto.password, 10);
    
    // Creamos un nuevo usuario con la contraseña encriptada
    const usuario = this.usuarioRepository.create({
      ...usuarioDto,
      password: hashedPassword,
    });

    return this.usuarioRepository.save(usuario);
  }

  findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

async findOne(id: number) {
  const c = await this.usuarioRepository.findOneBy({ idUsuario: id });
  if (c) return c;

  throw new HttpException(
    'No existe un usuario con ese id',
    HttpStatus.NOT_FOUND,
  );
}

async findByCorreo(correo: string) {
  const usuario = await this.usuarioRepository.findOne({ where: { correo } });
  return usuario;
}

  async remove(id: number) {
    const result = await this.usuarioRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException('No existe usuario con ese ID', HttpStatus.NOT_FOUND);
    }
    return new HttpException(`Usuario eliminado con éxito`, HttpStatus.OK);
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.findOne(id);
    await this.usuarioRepository.update(id, updateUsuarioDto);
    return usuario;
  }
}
