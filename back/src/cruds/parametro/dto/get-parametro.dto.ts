import { ApiProperty } from "@nestjs/swagger"

export class GetParametroDto {
    @ApiProperty()
    id: number
    @ApiProperty()
    nombre: string
    @ApiProperty()
    valor: string
}