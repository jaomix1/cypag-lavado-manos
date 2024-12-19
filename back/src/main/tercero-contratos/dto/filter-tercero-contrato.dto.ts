import { ApiProperty, PartialType } from "@nestjs/swagger"
import { IsOptional } from "class-validator"
import { Paginator } from "src/common/model/paginator"

export class FilterTerceroContratoDto extends PartialType(Paginator) {
    @ApiProperty({ required: false, maxLength: 20, default: null })
    @IsOptional()
    codigo: string
}
