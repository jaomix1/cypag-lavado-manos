import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional, Length, Min } from "class-validator"

export class CreateCupSedeDto {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @Min(1)
    cupId: number

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @Min(1)
    sedeId: number

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @Min(1)
    empresaId: number

    @ApiProperty({ required: true })
    @Min(1)
    terceroId: number

    @ApiProperty({ required: true })
    @Min(1)
    terceroContratoId: number

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @Min(0)
    costo: number

}
