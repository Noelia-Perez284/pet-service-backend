import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('mascota')
export class Mascota {
    @PrimaryGeneratedColumn()
    idMascota:number;
    @Column()
    nombre:string;
    @Column()
    tipo:string;
    @Column()           
    libreta:string;
    @Column()
    foto:string;

    constructor(nombre:string, tipo:string, libreta:string, foto:string){
        this.nombre=nombre;
        this.tipo=tipo;
        this.libreta=libreta;
        this.foto=foto
       }
}
