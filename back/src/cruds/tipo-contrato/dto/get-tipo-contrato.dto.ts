import { ApiProperty } from "@nestjs/swagger"

export class GetTipoContratoDto {
    @ApiProperty()
    id: number
    @ApiProperty()
    description: string
}