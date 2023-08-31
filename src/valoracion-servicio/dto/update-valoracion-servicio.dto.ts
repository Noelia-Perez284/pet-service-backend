import { PartialType } from '@nestjs/mapped-types';
import { CreateValoracionServicioDto } from './create-valoracion-servicio.dto';

export class UpdateValoracionServicioDto extends PartialType(CreateValoracionServicioDto) {}
