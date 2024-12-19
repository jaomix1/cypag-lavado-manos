import { BadRequestException, HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as sql from 'mssql';


import { MyConfig } from 'src/common/config';

@Injectable()
export class ComboService {
    constructor(private config: MyConfig) { }


    // async getDepartamentos() {
    //     try {
    //         const pool = await sql.connect(this.config.configBd())
    //         //Stored procedure    
    //         const result = await pool.request()
    //             .execute('[cup].[GetComboDepartamento]')
    //         return result.recordset;

    //     } catch (error) {
    //         this.ExceptionHandler(error);
    //     }
    // }

    // async getCiudades(departamentoId: number) {
    //     try {
    //         const pool = await sql.connect(this.config.configBd())
    //         //Stored procedure    
    //         const result = await pool.request()
    //             .input('departamentoId', sql.Int, departamentoId)
    //             .execute('[cup].[GetComboCiudad]')

    //         return result.recordset;

    //     } catch (error) {
    //         this.ExceptionHandler(error);
    //     }
    // }

    async GetComboGrupo() {
        try {
            const pool = await sql.connect(this.config.configBd())
            //Stored procedure    
            const result = await pool.request()
                .execute('[cup].[GetComboGrupo]')
            return result.recordset;

        } catch (error) {
            this.ExceptionHandler(error);
        }
    }

    async GetComboSubGrupo() {
        try {
            const pool = await sql.connect(this.config.configBd())
            //Stored procedure    
            const result = await pool.request()
                .execute('[cup].[GetComboSubGrupo]')
            return result.recordset;

        } catch (error) {
            this.ExceptionHandler(error);
        }
    }

    async GetComboTipoContratista() {
        try {
            const pool = await sql.connect(this.config.configBd())
            //Stored procedure    
            const result = await pool.request()
                .execute('[cup].[GetComboTipoContrato]')
            return result.recordset;

        } catch (error) {
            this.ExceptionHandler(error);
        }
    }

    async GetComboSoatGrupo() {
        try {
            const pool = await sql.connect(this.config.configBd())
            //Stored procedure    
            const result = await pool.request()
                .execute('[cup].[GetComboSoatGrupo]')
            return result.recordset;

        } catch (error) {
            this.ExceptionHandler(error);
        }
    }


    async GetComboEmpresa() {
        try {
            const pool = await sql.connect(this.config.configBd())
            //Stored procedure    
            const result = await pool.request()
                .execute('[cup].[GetComboEmpresa]')
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
                .execute('[cup].[GetComboSede]')
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
                .execute('[cup].[GetComboSedeByEmpresaId]')
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
                .execute('[cup].[GetComboTipoDocumento]')
            return result.recordset;

        } catch (error) {
            this.ExceptionHandler(error);
        }
    }

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
