import { Mascota } from "src/mascota/entities/mascota.entity";
import { PerdidosYencontrado } from "src/perdidos-yencontrados/entities/perdidos-yencontrado.entity";
import { ValoracionServicio } from "src/valoracion-servicio/entities/valoracion-servicio.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('usuario')
export class Usuario {
    @PrimaryGeneratedColumn()
    idUsuario:number;
    @Column({unique:true})
    correo:string;
    @Column()
    password:string;
    @Column()
    tipo:number;
    @Column()
    nombre:string;
    @Column()
    apellido:string;

    @OneToMany(type => Mascota, mascota => mascota.duenio)
    @JoinColumn()
    mascotas: Mascota[];

    @OneToMany(type => ValoracionServicio, valoracion => valoracion.usuario)
    @JoinColumn()
    valoraciones: ValoracionServicio[];

    @OneToMany(type => PerdidosYencontrado, perdidoEncontrado => perdidoEncontrado.contacto)
    @JoinColumn()
    perdidosYencontrados: PerdidosYencontrado[];

    constructor(correo:string,password:string, tipo:number, nombre:string, apellido:string){
        this.correo=correo;
        this.password=password;
        this.tipo=tipo;
        this.nombre=nombre;
        this.apellido=apellido;
    }
}
