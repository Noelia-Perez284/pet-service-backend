/* eslint-disable prettier/prettier */
import { TarjetaServicio } from "src/tarjeta-servicio/entities/tarjeta-servicio.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("valoracionServicio")
export class ValoracionServicio {
  @PrimaryGeneratedColumn()
  idValoracionServicio: number;
  @Column()
  valoracion: number;
  @Column()
  comentario: string;

  @ManyToOne(
    (type) => TarjetaServicio,
    (tarjetaServicio) => tarjetaServicio.valoraciones,
  )
  @JoinColumn()
  tarjetaServicio: TarjetaServicio;

  @ManyToOne((type) => Usuario, (usuario) => usuario.valoraciones)
  @JoinColumn()
  usuario: Usuario;

  constructor(valoracion: number, comentario: string) {
    this.valoracion = valoracion;
    this.comentario = comentario;
  }
}
