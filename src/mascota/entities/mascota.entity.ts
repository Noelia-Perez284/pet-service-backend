import { Usuario } from "src/usuario/entities/usuario.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("mascota")
export class Mascota {
  @PrimaryGeneratedColumn()
  idMascota: number;
  @Column()
  nombre: string;
  @Column()
  tipo: string;
  @Column({ nullable: true })
  libreta: string;
  @Column()
  foto: string;

  @ManyToOne((type) => Usuario, (usuario) => usuario.mascotas)
  @JoinColumn()
  duenio: Usuario;

  constructor(nombre: string, tipo: string, libreta: string, foto: string) {
    this.nombre = nombre;
    this.tipo = tipo;
    this.libreta = libreta;
    this.foto = foto;
  }
}
