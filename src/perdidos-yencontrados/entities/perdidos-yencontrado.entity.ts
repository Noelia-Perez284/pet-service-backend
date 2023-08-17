import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


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

    @ManyToOne(type => Usuario, usuario => usuario.perdidosYencontrados)
    @JoinColumn()
    contactoUsuario: Usuario;

    constructor(nombre:string, tipo:string, descripcion:string, contacto:string, ubicacion:string){
        this.nombre=nombre;
        this.tipo=tipo;
        this.descripcion=descripcion;
        this.conacto=contacto;
        this.ubicacion=ubicacion;      
    
    }
}
