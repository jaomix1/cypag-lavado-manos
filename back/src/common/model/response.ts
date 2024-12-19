import { ApiProperty } from "@nestjs/swagger";

export class ResponseModel<T> {

    @ApiProperty({ default: [] })
    data: T[]

    @ApiProperty()
    count: number
}