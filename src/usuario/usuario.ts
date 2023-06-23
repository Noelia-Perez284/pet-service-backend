export class Usuario {
    readonly id:string;
    readonly nombre:string;
    readonly apellido:string;
    readonly email:string;
    readonly password:string;
    readonly nombreMascota:string;
    readonly especieMascota:string;
    readonly libretaSanitaria:string;

    constructor(id:string,
        nombre:string,
        apellido:string,
        email:string,
        password:string,
        nombreMascota:string,
        especieMascota:string,
        libretaSanitaria:string
        
        ){
            this.id=id;
            this.nombre=nombre;
            this.apellido=apellido;
            this.email=email;
            this.password=password;
            this.nombreMascota=nombreMascota;
            this.especieMascota=especieMascota;
            this.libretaSanitaria=libretaSanitaria
    }

}