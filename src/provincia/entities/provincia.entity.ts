import { TarjetaServicio } from "src/tarjeta-servicio/entities/tarjeta-servicio.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('provincia')
export class Provincia {
    @PrimaryGeneratedColumn()
    idProvincia:number;
    @Column()
    nombre:string;


    @OneToMany(type => TarjetaServicio, tarjetaServicio => tarjetaServicio.provincia)
    @JoinColumn()
    tarjetasServicio: TarjetaServicio[];
    
    constructor(nombre:string){
        this.nombre=nombre;
        
    }
} 
