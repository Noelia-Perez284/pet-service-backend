import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class UsuarioDto{
    
    @IsString()
    @IsNotEmpty()
    readonly nombre:string;

    @IsString()
    @IsNotEmpty()
    readonly apellido:string;
 
    @IsEmail()
    readonly email:string;

    @Matches(/^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/, {
        message: 'La contraseña debe tener al menos un carácter numérico y un carácter alfabético, y una longitud mínima de 6 caracteres',
    })
    readonly password:string;

    @IsString()
    @IsNotEmpty()
    readonly nombreMascota:string;

    @IsString()
    @IsNotEmpty()
    readonly especieMascota:string;

    @IsString()
    @IsNotEmpty()
    readonly libretaSanitaria:string;

}