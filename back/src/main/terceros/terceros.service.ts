import { BadRequestException, HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import * as sql from 'mssql';

import { MyConfig } from 'src/common/config';
import { ResponseModel } from 'src/common/model/response';
import { copy } from 'src/common/copy';


import { CreateTerceroDto } from './dto/create-tercero.dto';
import { UpdateTerceroDto } from './dto/update-tercero.dto';
import { GetTerceroDto } from './dto/get-tercero.dto';
import { FilterTerceroDto } from './dto/filter-tercero.dto';

@Injectable()
export class TercerosService {
  constructor(private config: MyConfig) {
  }

  async create(data: CreateTerceroDto, ususarioId: any) {
    try {

      const pool = await sql.connect(this.config.configBd())
      const result = await pool.request()
        .input('usuarioId', sql.VarChar, ususarioId)
        .input('descripcion', sql.VarChar(70), data.descripcion)
        .input('documento', sql.VarChar(20), data.documento)
        .input('tipoDocumentoId', sql.Int, data.tipoDocumentoId)
        .execute('[cup].[CreateTercero]')

      const response: GetTerceroDto = { ...result.recordset[0] };

      return response;

    } catch (error) {
      this.ExceptionHandler(error);
    }
  }

  async findAll(data: FilterTerceroDto) {
    try {
      const pool = await sql.connect(this.config.configBd())
      const result = await pool.request()
        .input('page', sql.Int, data.page ? data.page : 0)
        .input('rowsByPag', sql.Int, data.rowsByPag ? data.rowsByPag : 10)
        .input('documento', sql.VarChar(20), data.documento)
        .execute('[cup].[GetAllTerceros]')

      const response = new ResponseModel<GetTerceroDto>();
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
        .input('terceroId', sql.Int, id)
        .execute('[cup].[GetTerceroById]')

      if (result.recordset[0] === undefined) {
        throw new NotFoundException(copy.DatosNoEncontrados);
      }
      const response: GetTerceroDto = { ...result.recordset[0] };

      return response;
    } catch (error) {
      this.ExceptionHandler(error);
    }
  }

  async update(id: number, data: UpdateTerceroDto, ususarioId: any) {
    try {

      const pool = await sql.connect(this.config.configBd())
      const result = await pool.request()
        .input('usuarioId', sql.VarChar, ususarioId)
        .input('terceroId', sql.Int, id)
        .input('descripcion', sql.VarChar(70), data.descripcion)
        .input('documento', sql.VarChar(20), data.documento)
        .input('tipoDocumentoId', sql.Int, data.tipoDocumentoId)
        .execute('[cup].[UpdateTercero]')

      const response: GetTerceroDto = { ...result.recordset[0] };

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
        .input('terceroId', sql.Int, id)
        .execute('[cup].[DeleteTercero]')

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
