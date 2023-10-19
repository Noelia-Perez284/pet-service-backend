import { ViewEntity, ViewColumn } from "typeorm";

@ViewEntity({
  name: "datosServicio",
  expression: ` select ts.* , p.nombre AS nombre_provincia from  tarjetaServicio ts
left join categoria c on ts.categoriaIdCategoria = c.idcategoria
left join provincia p on ts.provinciaIdProvincia = p.idProvincia;`,
})
export class datosServicio {
  @ViewColumn()
  idTarjetaServicio: number;

  @ViewColumn()
  valoracion: number;

  @ViewColumn()
  imagen: string;

  @ViewColumn()
  nombre: string;

  @ViewColumn()
  precio: number;

  @ViewColumn()
  localidad: string;

  @ViewColumn()
  descripcion: string;

  @ViewColumn()
  contacto: string;

  @ViewColumn()
  categoriaIdCategoria: number;

  @ViewColumn()
  provinciaIdProvincia: number;

  @ViewColumn()
  nombre_provincia: string;
}
