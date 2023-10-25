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
    contacto:string;
    @Column()
    ubicacion:string;
    @Column()
    imagen: string;

    @ManyToOne(type => Usuario, usuario => usuario.perdidosYencontrados)
    @JoinColumn()
    contactoUsuario: Usuario;

    constructor(nombre:string, tipo:string, descripcion:string, contacto:string, ubicacion:string, imagen: string){
        this.nombre=nombre;
        this.tipo=tipo;
        this.descripcion=descripcion;
        this.contacto=contacto;
        this.ubicacion=ubicacion; 
        this.imagen= imagen;     
    
    }
}
