import { TarjetaServicio } from "src/tarjeta-servicio/entities/tarjeta-servicio.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('categoria')
export class Categoria {
    @PrimaryGeneratedColumn()
    idCategoria:number;
    @Column()
    nombre:string;
    
    @OneToMany(type => TarjetaServicio, tarjetaServicio => tarjetaServicio.categoria)
    @JoinColumn()
    tarjetasServicio: TarjetaServicio[];

    constructor(nombre:string){
        this.nombre=nombre;
    }
}
