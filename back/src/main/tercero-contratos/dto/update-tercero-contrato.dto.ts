import { PartialType } from '@nestjs/swagger';
import { CreateTerceroContratoDto } from './create-tercero-contrato.dto';

export class UpdateTerceroContratoDto extends PartialType(CreateTerceroContratoDto) { }
