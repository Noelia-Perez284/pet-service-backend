import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";




@Entity('valoracionServicio')
export class ValoracionServicio {
    @PrimaryGeneratedColumn()
    idValoracionServicio:number;
    @Column()
    valoracion:number;
    @Column()
    comentario:string;

    constructor(valoracion:number, comantario:string){
        this.valoracion=valoracion;
        this.comentario=this.comentario;
    }
}
