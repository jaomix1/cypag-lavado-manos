import { ApiProperty } from "@nestjs/swagger"

export class ErrorModel {
    @ApiProperty()
    message: string
}