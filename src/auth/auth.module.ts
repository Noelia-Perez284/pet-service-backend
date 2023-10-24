import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { UsuarioModule } from "../usuario/usuario.module";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [
    UsuarioModule,
    PassportModule,
    JwtModule.register({
      secret:
        "clave_secreta" /*falta guardar la clave en una variable segura */,
      signOptions: { expiresIn: "1h" },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
