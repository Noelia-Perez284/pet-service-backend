import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Usuario } from './usuario';
import { UsuarioDto } from 'src/dto/usuarioDto';
import { v4 as uuid } from "uuid";

@Injectable()
export class UsuarioService {
  private readonly usuarios:Usuario []=[
    {
      id: "1",
      nombre: "Juan",
      apellido: "Pérez",
      email: "juan@example.com",
      password: "contraseña123",
      nombreMascota: "Max",
      especieMascota: "Perro",
      libretaSanitaria: "123456789"
    },
    {
      id: "2",
      nombre: "María",
      apellido: "López",
      email: "maria@example.com",
      password: "abc123",
      nombreMascota: "Luna",
      especieMascota: "Gato",
      libretaSanitaria: "987654321"
    },
    {
      id: "3",
      nombre: "Ana",
      apellido: "García",
      email: "ana@example.com",
      password: "qwerty123",
      nombreMascota: "Pelusa",
      especieMascota: "Gato",
      libretaSanitaria: "456789123"
    },
    {
      id: "4",
      nombre: "Carlos",
      apellido: "Ramírez",
      email: "carlos@example.com",
      password: "password123",
      nombreMascota: "Rocky",
      especieMascota: "Perro",
      libretaSanitaria: "789123456"
    },
    {
      id: "5",
      nombre: "Luisa",
      apellido: "Martínez",
      email: "luisa@example.com",
      password: "abcdef123",
      nombreMascota: "Nala",
      especieMascota: "Gato",
      libretaSanitaria: "321654987"
    }
  ];


  getUsuarios(): Usuario[] {
    return this.usuarios;
  }

  createUsuario(usuarioDto: UsuarioDto): Usuario {
    let newUsuario = new Usuario(uuid(),
      usuarioDto.nombre,
      usuarioDto.apellido,
      usuarioDto.email,
      usuarioDto.password,
      usuarioDto.nombreMascota,
      usuarioDto.especieMascota,
      usuarioDto.libretaSanitaria
    );
    this.usuarios.push(newUsuario);
    console.log(newUsuario);

    return newUsuario
  }

  validateUser(email: string, password: string): boolean {
    try {
      const user = this.usuarios.find((u) => u.email === email);
      if (user && user.password === password) {
        return true;
      }
    }
    catch (error) {
      throw new HttpException('Ocurrió un error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return false;
  }
    
}