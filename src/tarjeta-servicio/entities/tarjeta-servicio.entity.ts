import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('tarjetaServicio')
export class TarjetaServicio {
    @PrimaryGeneratedColumn()
    idTarjetaServicio:number;
    @Column()
    valoracion:number;
    @Column()
    imagen:string;
    @Column()
    nombre:string;
    @Column()
    precio:number;
    @Column()
    localidad:string;
    @Column()
    descripcion:string;
    @Column()
    contacto:string;

    constructor(
        valoracion:number,
        imagen:string,
        nombre:string,
        precio:number,
        localidad:string,
        descripcion:string,
        contacto:string){
            this.valoracion=valoracion;
            this.imagen=imagen;
            this.nombre=nombre;
            this.precio=precio;
            this.localidad=localidad;
            this.descripcion=descripcion;
            this.contacto=contacto;
        }

}
