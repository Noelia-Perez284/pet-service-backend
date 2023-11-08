import { IsNumber, IsString } from "class-validator";

export class CreateValoracionServicioDto {
    @IsNumber()
    idTarjetaServicio: number;

    @IsNumber()
    idUsuario: number;

    @IsNumber()
    valoracion: number;
    
    @IsString()
    comentario:string;

}
    