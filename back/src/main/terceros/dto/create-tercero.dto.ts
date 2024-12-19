import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsNotEmpty, IsOptional, IsString, Length, Min } from "class-validator"

export class CreateTerceroDto {
    @ApiProperty({ required: true, maxLength: 50 })
    @IsNotEmpty()
    @Length(3, 70)
    descripcion: string

    @ApiProperty({ required: true, maxLength: 20 })
    @IsNotEmpty()
    @Length(3, 20)
    documento: string

    @ApiProperty({ required: true, default: null, nullable: true, type: "number" })
    //@IsOptional()
    @IsInt()
    @Min(1)
    tipoDocumentoId: number

    // @ApiProperty({ required: false, maxLength: 20, default: "" })
    // @IsString()
    // @Length(3, 20)
    // codigoSoat: string

    // @ApiProperty({ required: false, default: null })
    // @IsOptional()
    // @Min(0)
    // uvrIss: number

    // @ApiProperty({ required: false, default: null })
    // @IsOptional()
    // @Min(0)
    // valorIss: number

    // @ApiProperty({ required: false, default: null })
    // @IsOptional()
    // @Min(1)
    // soatGrupoId: number

    // @ApiProperty({ required: false, default: null })
    // @IsOptional()
    // @Min(0)
    // valorSoat: number

    // @ApiProperty({ required: true })
    // @IsInt()
    // @Min(1)
    // grupoId: number

    // @ApiProperty({ required: true, default: null, nullable: true, type: "number" })
    // @IsOptional()
    // @IsInt()
    // @Min(1)
    // subGrupoId?: number
}
