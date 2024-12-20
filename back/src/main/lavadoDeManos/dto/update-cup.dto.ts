import { PartialType } from '@nestjs/swagger';
import { CreateCupDto } from './create-cup.dto';

export class UpdateCupDto extends PartialType(CreateCupDto) {}
