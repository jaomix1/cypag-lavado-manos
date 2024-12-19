import { ApiProperty } from "@nestjs/swagger"

export class GetTerceroDto {
    @ApiProperty()
    terceroId: number

    @ApiProperty()
    descripcion: string

    @ApiProperty()
    documento: string

    @ApiProperty()
    tipoIdentificacionId: number

    @ApiProperty()
    tipoIdentificacion: string
}
