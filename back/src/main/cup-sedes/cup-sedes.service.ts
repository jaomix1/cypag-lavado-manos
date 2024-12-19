/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as sql from 'mssql';

import { MyConfig } from 'src/common/config';
import { ResponseModel } from 'src/common/model/response';


import { CreateCupSedeDto } from './dto/create-cup-sede.dto';
import { UpdateCupSedeDto } from './dto/update-cup-sede.dto';
import { GetCupSedeDto } from './dto/get-cup-sede.dto';
import { FilterCupSedeDto } from './dto/filter-cup-sede.dto';
import { copy } from 'src/common/copy';

@Injectable()
export class CupSedesService {
  constructor(private config: MyConfig) {
  }

  async create(data: CreateCupSedeDto, ususarioId: any) {
    try {

      const pool = await sql.connect(this.config.configBd())
      const result = await pool.request()
        .input('usuarioId', sql.VarChar, ususarioId)
        .input('cupId', sql.Int, data.cupId)
        .input('sedeId', sql.Int, data.sedeId)
        .input('empresaId', sql.Int, data.empresaId)
        .input('terceroContratoId', sql.Int, data.terceroContratoId)
        .input('costo', sql.Decimal(18, 2), data.costo)
        .execute('[cup].[CreateCupSede]')

      const response: GetCupSedeDto = { ...result.recordset[0] };

      return response;

    } catch (error) {
      this.ExceptionHandler(error);
    }
  }

  async findAll(id: number, data: FilterCupSedeDto) {
    try {
      const pool = await sql.connect(this.config.configBd())
      const result = await pool.request()
        .input('cupId', sql.Int, id)
        .input('page', sql.Int, data.page ? data.page : 0)
        .input('rowsByPag', sql.Int, data.rowsByPag ? data.rowsByPag : 10)
        .execute('cup.GetAllCupSedesByCupId')

      const response = new ResponseModel<GetCupSedeDto>();
      response.count = result.recordsets[0][0].Count;
      response.data = result.recordsets[0][0].Count != 0 ? result.recordsets[1] : [];
      return response;
    } catch (error) {
      this.ExceptionHandler(error);
    }
  }

  async findOne(id: number) {
    try {
      const pool = await sql.connect(this.config.configBd())
      const result = await pool.request()
        .input('cupSedeId', sql.Int, id)
        .execute('[cup].[GetCupSedeById]')

      if (result.recordset[0] === undefined) {
        throw new BadRequestException(copy.DatosNoEncontrados);
      }

      const response: GetCupSedeDto = { ...result.recordset[0] };

      return response;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        this.ExceptionHandler(error);
      }
    }
  }

  async update(id: number, data: UpdateCupSedeDto, ususarioId: any) {
    try {

      const pool = await sql.connect(this.config.configBd())
      const result = await pool.request()
        .input('usuarioId', sql.VarChar, ususarioId)
        .input('cupSedeId', sql.Int, id)
        .input('cupId', sql.Int, data.cupId)
        .input('sedeId', sql.Int, data.sedeId)
        .input('empresaId', sql.Int, data.empresaId)
        .input('terceroContratoId', sql.Int, data.terceroContratoId)
        .input('costo', sql.Decimal(18, 2), data.costo)
        .execute('[cup].[UpdateCupSede]')

      const response: GetCupSedeDto = { ...result.recordset[0] };

      return response;

    } catch (error) {
      this.ExceptionHandler(error);
    }
  }

  async remove(id: number, ususarioId: any) {
    try {
      const pool = await sql.connect(this.config.configBd())
      const result = await pool.request()
        .input('usuarioId', sql.VarChar, ususarioId)
        .input('cupSedeId', sql.Int, id)
        .execute('[cup].[DeleteCupSede]')

      return true;
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
