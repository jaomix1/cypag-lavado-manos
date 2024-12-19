import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, Length } from "class-validator";

export class CreateTipoContratoDto {
    @ApiProperty({ required: false, default: null, maxLength: 50 })
    @Length(3, 120)
    descripcion: string
}
