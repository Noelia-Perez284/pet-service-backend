import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('usuario')
export class Usuario {
    @PrimaryGeneratedColumn()
    idUsuario:number;
    @Column()
    correo:string;
    @Column()
    password:string;
    @Column()
    tipo:number;
    @Column()
    nombre:string;
    @Column()
    apellido:string;

    constructor(correo:string,password:string, tipo:number, nombre:string, apellido:string){
        this.correo=correo;
        this.password=password;
        this.tipo=tipo;
        this.nombre=nombre;
        this.apellido=apellido;
    }
}
