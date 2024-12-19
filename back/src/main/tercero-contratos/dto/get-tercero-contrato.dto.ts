import { ApiProperty } from "@nestjs/swagger"

export class GetTerceroContratoDto {
    @ApiProperty()
    terceroContratoId: number

    @ApiProperty()
    terceroId: number

    @ApiProperty()
    tercero: string

    @ApiProperty()
    tipoContratoId: number

    @ApiProperty()
    tipoContrato: string

    @ApiProperty()
    codigo: string

    @ApiProperty()
    descripcion: string

    @ApiProperty()
    fechaVigenciaInicial: Date

    @ApiProperty()
    fechaVigenciaFinal: Date

    @ApiProperty()
    esPrologaAutomatica: boolean

    @ApiProperty()
    esAutoIncremento: boolean

    @ApiProperty()
    porcentajeIncremento: number
}
