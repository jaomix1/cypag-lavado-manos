import { BadRequestException, HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as sql from 'mssql';


import { MyConfig } from 'src/common/config';

@Injectable()
export class ComboService {
    constructor(private config: MyConfig) { }

    ExceptionHandler(error) {
        if (error instanceof HttpException) {
            throw error;
        }
        else {
            if (error.originalError.info != undefined && error.originalError.info.number < 50000) {

                throw new InternalServerErrorException("Error interno");
            } else {
                throw new BadRequestException(error.originalError.info.message);
            }
        }
    }
}
