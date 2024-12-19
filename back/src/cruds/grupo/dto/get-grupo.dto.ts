import { ApiProperty } from "@nestjs/swagger"

export class GetGrupoDto {
    @ApiProperty()
    id: number
    @ApiProperty()
    description: string
}