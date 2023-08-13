import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('perdidosYencontrado')
export class PerdidosYencontrado {
    @PrimaryGeneratedColumn()
    idPerdidosYEncontrados:number;
    @Column()
    nombre:string;
    @Column()
    tipo:string;
    @Column()
    descripcion:string;
    @Column()
    conacto:string;
    @Column()
    ubicacion:string;

    constructor(nombre:string, tipo:string, descripcion:string, contacto:string, ubicacion:string){
        this.nombre=nombre;
        this.tipo=tipo;
        this.descripcion=descripcion;
        this.conacto=contacto=contacto;
        this.ubicacion=ubicacion;      
    
    }
}
