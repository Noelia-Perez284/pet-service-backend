import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMascotaDto {

    @IsString()
    @IsNotEmpty()
    nombre:string;
    
    @IsNotEmpty()
    @IsString()
    tipo:string;

    @IsString()
    @IsNotEmpty()
    libreta:string;

    @IsString()
    foto: string;

    @IsNotEmpty()
    duenioIdUsuario:number;
}
