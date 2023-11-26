import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePerdidosYencontradoDto {

    @IsString()
    @IsNotEmpty()
    nombre: string;
    
    @IsNotEmpty()
    @IsString()
    tipo: string;
    
    @IsNotEmpty()
    @IsString()
    descripcion: string;
    
    @IsNotEmpty()
    @IsString()
    contacto: string;
    
    @IsNotEmpty()
    @IsString()
    ubicacion: string;

    @IsNotEmpty()
    @IsString()
    imagen: string;

    @IsNotEmpty()
    @IsNumber()
    contactoUsuarioIdUsuario:number
}
