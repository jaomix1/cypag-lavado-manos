import { ApiProperty } from "@nestjs/swagger"

export class GetCupDto {
    @ApiProperty()
    cupId: number

    @ApiProperty()
    codigo: string

    @ApiProperty()
    descripcion: string

    @ApiProperty()
    codigoSoat: string

    @ApiProperty()
    uvrIss: number

    @ApiProperty()
    valorIss: number

    @ApiProperty()
    soatGrupoId: number

    @ApiProperty()
    soatGrupo: string

    @ApiProperty()
    valorSoat: number

    @ApiProperty()
    grupoId: number

    @ApiProperty()
    grupo: string

    @ApiProperty()
    subGrupoId: number

    @ApiProperty()
    subGrupo: string
}
