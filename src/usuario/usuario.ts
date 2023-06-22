export class Usuario {
    id:string;
    nombre:string;
    apellido:string;
    email:string;
    password:string;
    nombreMascota:string;
    especieMascota:string;
    libretaSanitaria:string;

    constructor(id:string,
        nombre:string,
        apellido:string,
        password:string,
        nombreMascota:string,
        especieMascota:string,
        libretaSanitaria:string
        
        ){
            this.id=id;
            this.nombre=nombre;
            this.apellido=apellido;
            this.password=password;
            this.nombreMascota=nombreMascota;
            this.especieMascota=especieMascota;
            this.libretaSanitaria=libretaSanitaria
    }

}