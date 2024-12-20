import { BadRequestException, HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as sql from 'mssql';


import { MyConfig } from 'src/common/config';

@Injectable()
export class ComboService {
    constructor(private config: MyConfig) { }

    //#region Globales

    async GetComboEmpresa() {
        try {
            const pool = await sql.connect(this.config.configBd())
            //Stored procedure    
            const result = await pool.request()
                .input('appId', sql.VarChar, this.config.getAppId())
                .execute('[glo].[GetComboEmpresaAppId]')
            return result.recordset;

        } catch (error) {
            this.ExceptionHandler(error);
        }
    }

    async GetComboSede() {
        try {
            const pool = await sql.connect(this.config.configBd())
            //Stored procedure    
            const result = await pool.request()
                .input('appId', sql.VarChar, this.config.getAppId())
                .execute('[glo].[GetComboSedeByAppId]')
            return result.recordset;

        } catch (error) {
            this.ExceptionHandler(error);
        }
    }

    async GetComboSedesByEmpresa(empresaId: number) {
        try {
            const pool = await sql.connect(this.config.configBd())
            //Stored procedure    
            const result = await pool.request()
                .input('empresaId', sql.Int, empresaId)
                .input('appId', sql.VarChar, this.config.getAppId())
                .execute('[glo].[GetComboSedeByEmpresaId]')
            return result.recordset;

        } catch (error) {
            this.ExceptionHandler(error);
        }
    }

    async GetComboTipoDocumento() {
        try {
            const pool = await sql.connect(this.config.configBd())
            //Stored procedure    
            const result = await pool.request()
                .input('appId', sql.VarChar, this.config.getAppId())
                .execute('[glo].[GetComboTipoDocumentoByAppId]')
            return result.recordset;

        } catch (error) {
            this.ExceptionHandler(error);
        }
    }

    //#endregion


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
