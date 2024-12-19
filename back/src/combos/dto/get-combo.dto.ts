import { ApiProperty } from "@nestjs/swagger"

export class GetComboDto {
    @ApiProperty()
    id: number
    @ApiProperty()
    description: string
}