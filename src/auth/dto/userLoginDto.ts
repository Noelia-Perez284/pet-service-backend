export class UserLoginDto{
    public succes:boolean;
    public token:string;
    public correo:string;
    public nombre:string;
    public mensaje:string;
    public tipo: number;
     public idUsuario: number;
  
  

    constructor( 
        token:string,
        correo:string,
        nombre:string,
        succes:boolean,
        mensaje:string,
        tipo: number,
        idUsuario: number
      ){
        this.token=token;
        this.correo=correo;
        this.nombre=nombre;
        this.succes=succes;
        this.mensaje=mensaje;
        this.tipo = tipo;
        this.idUsuario=idUsuario
      }
      
}
