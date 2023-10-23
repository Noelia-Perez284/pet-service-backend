import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class UserLoginDto {
  @IsEmail()
  correo: string;


  @Matches(/^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/, {
    message: 'La contraseña debe tener al menos un carácter numérico y un carácter alfabético, y una longitud mínima de 6 caracteres',
})
  password: string;

}