import { Categoria } from "src/categoria/entities/categoria.entity";
import { Provincia } from "src/provincia/entities/provincia.entity";
import { ValoracionServicio } from "src/valoracion-servicio/entities/valoracion-servicio.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("tarjetaServicio")
export class TarjetaServicio {
  @PrimaryGeneratedColumn()
  idTarjetaServicio: number;
  @Column()
  imagen: string;
  @Column()
  nombre: string;
  @Column()
  precio: number;
  @Column()
  localidad: string;
  @Column()
  descripcion: string;
  @Column()
  contacto: string;

  @ManyToOne((type) => Categoria, (categoria) => categoria.tarjetasServicio)
  @JoinColumn(/* { name: 'idCategoria' } */)
  categoria: Categoria;

  @ManyToOne((type) => Provincia, (provincia) => provincia.tarjetasServicio)
  @JoinColumn(/* { name: 'idProvincia' } */)
  provincia: Provincia;

  @OneToMany(
    (type) => ValoracionServicio,
    (valoracion) => valoracion.tarjetaServicio,
  )
  valoraciones: ValoracionServicio[];

  constructor(
    imagen: string,
    nombre: string,
    precio: number,
    localidad: string,
    descripcion: string,
    contacto: string,
  ) {
    this.imagen = imagen;
    this.nombre = nombre;
    this.precio = precio;
    this.localidad = localidad;
    this.descripcion = descripcion;
    this.contacto = contacto;
  }
}
