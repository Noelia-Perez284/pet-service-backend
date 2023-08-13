import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('categoria')
export class Categoria {
    @PrimaryGeneratedColumn()
    idCategoria:number;
    @Column()
    nombre:string;

    constructor(nombre:string){
        this.nombre=nombre;
    }
}
