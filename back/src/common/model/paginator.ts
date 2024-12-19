import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional } from "class-validator";

export class Paginator {
    @ApiProperty({ default: 0, required: false })
    @IsInt()
    @IsOptional()
    page?: number = 0;

    @ApiProperty({ default: 10, required: false })
    @IsInt()
    @IsOptional()
    rowsByPag?: number = 10;
}