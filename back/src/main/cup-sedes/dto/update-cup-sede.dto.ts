import { PartialType } from '@nestjs/swagger';
import { CreateCupSedeDto } from './create-cup-sede.dto';

export class UpdateCupSedeDto extends PartialType(CreateCupSedeDto) {}
