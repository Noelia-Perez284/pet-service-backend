import { IsEmail, IsNotEmpty, IsNumber, IsString, Matches } from "class-validator";

export class CreateUsuarioDto {
    @IsNotEmpty()
    readonly nombre:string;

    @IsString()
    @IsNotEmpty()
    readonly apellido:string;

    @IsEmail()
    readonly correo:string;
    
    @Matches(/^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/, {
        message: 'La contraseña debe tener al menos un carácter numérico y un carácter alfabético, y una longitud mínima de 6 caracteres',
    })
    readonly password:string;
    @IsNumber()
    readonly tipo: number= 1; // Asignar el valor predeterminado 1 al campo tipo,
    //para asegurarme de que todos los usuarios que se registran por web no tengan perfil de admin.

}