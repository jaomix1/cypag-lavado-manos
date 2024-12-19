import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsNotEmpty, IsOptional, IsString, Length, Min } from "class-validator"

export class CreateTerceroContratoDto {


    @ApiProperty({ required: true, type: "number" })
    @IsInt()
    @Min(1)
    terceroId: number

    @ApiProperty({ required: true, type: "number" })
    @IsInt()
    @Min(1)
    tipoContratoId: number

    @ApiProperty({ required: false, maxLength: 50 })
    @IsOptional()
    @Length(3, 70)
    descripcion?: string

    @ApiProperty({ required: true, maxLength: 20 })
    @IsNotEmpty()
    @Length(3, 20)
    codigo: string

    @ApiProperty({ required: true, type: "string", format: "date" })
    fechaVigenciaInicial: Date

    @ApiProperty({ required: true, type: "string", format: "date" })
    fechaVigenciaFinal: Date

    @ApiProperty({ required: true, default: false, type: "boolean" })
    esPrologaAutomatica: boolean

    @ApiProperty({ required: true, default: false, type: "boolean" })
    esAutoIncremento: boolean

    @ApiProperty({ required: true, default: 0, maximum: 100, minimum: 0, type: "number" })
    porcentajeIncremento: number
}
