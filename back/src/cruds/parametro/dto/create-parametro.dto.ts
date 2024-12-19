import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, Length } from "class-validator";

export class CreateParametroDto {
    @ApiProperty({ required: true, default: null, maxLength: 50 })
    @Length(3, 50)
    nombre: string

    @ApiProperty({ required: true, default: null, maxLength: 50 })
    @Length(3, 50)
    valor: string
}
