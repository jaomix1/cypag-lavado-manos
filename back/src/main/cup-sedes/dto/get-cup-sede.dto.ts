import { ApiProperty } from "@nestjs/swagger"

export class GetCupSedeDto {
    @ApiProperty()
    cupSedeId: number

    @ApiProperty()
    cupId: number

    @ApiProperty()
    empresaId: number

    @ApiProperty()
    empresa: string

    @ApiProperty()
    sedeId: number

    @ApiProperty()
    sede: string

    @ApiProperty()
    terceroContratoId: number

    @ApiProperty()
    terceroCodigo: string

    @ApiProperty()
    terceroContrato: string

    @ApiProperty()
    terceroTipoContrato: string

    @ApiProperty()
    fechaInicio: Date

    @ApiProperty()
    fechaFin: Date

    @ApiProperty()
    costo: number
}
