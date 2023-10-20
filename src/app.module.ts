/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { TypeOrmModule } from "@nestjs/typeorm";
import { type } from "os";
import { PerdidosYencontradosModule } from "./perdidos-yencontrados/perdidos-yencontrados.module";
import { UsuarioModule } from "./usuario/usuario.module";
import { MascotaModule } from "./mascota/mascota.module";
import { ValoracionServicioModule } from "./valoracion-servicio/valoracion-servicio.module";
import { TarjetaServicioModule } from "./tarjeta-servicio/tarjeta-servicio.module";
import { ProvinciaModule } from "./provincia/provincia.module";
import { CategoriaModule } from "./categoria/categoria.module";
import { VistaModule } from './vista/vista.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'client') }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "R$gasali123",
      database: "petservice",
      entities: ["dist/**/**.entity{.ts,.js}"],
      synchronize: false,
    }),
    PerdidosYencontradosModule,
    UsuarioModule,
    MascotaModule,
    ValoracionServicioModule,
    TarjetaServicioModule,
    ProvinciaModule,
    CategoriaModule,
    VistaModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
