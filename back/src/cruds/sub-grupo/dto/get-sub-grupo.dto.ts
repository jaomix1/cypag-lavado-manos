import { ApiProperty } from "@nestjs/swagger"

export class GetSubGrupoDto {
    @ApiProperty()
    id: number
    @ApiProperty()
    description: string
}