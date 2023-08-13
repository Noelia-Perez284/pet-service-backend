import { PartialType } from '@nestjs/mapped-types';
import { CreateTarjetaServicioDto } from './create-tarjeta-servicio.dto';

export class UpdateTarjetaServicioDto extends PartialType(CreateTarjetaServicioDto) {}
