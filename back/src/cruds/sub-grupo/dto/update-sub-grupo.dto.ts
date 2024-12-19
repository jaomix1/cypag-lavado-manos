import { PartialType } from '@nestjs/swagger';
import { CreateSubGrupoDto } from './create-sub-grupo.dto';

export class UpdateSubGrupoDto extends PartialType(CreateSubGrupoDto) { }
