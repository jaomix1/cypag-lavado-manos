import { BadRequestException, Injectable, HttpException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import * as sql from 'mssql';

import { MyConfig } from 'src/common/config';
import { ResponseModel } from 'src/common/model/response';
import { copy } from 'src/common/copy';

import { CreateTerceroContratoDto } from './dto/create-tercero-contrato.dto';
import { UpdateTerceroContratoDto } from './dto/update-tercero-contrato.dto';
import { GetTerceroContratoDto } from './dto/get-tercero-contrato.dto';
import { FilterTerceroContratoDto } from './dto/filter-tercero-contrato.dto';

@Injectable()
export class TerceroContratosService {
  constructor(private config: MyConfig) { }

  async create(data: CreateTerceroContratoDto, ususarioId: any) {
    try {

      const pool = await sql.connect(this.config.configBd())
      const result = await pool.request()
        .input('usuarioId', sql.VarChar, ususarioId)
        .input('terceroId', sql.Int, data.terceroId)
        .input('tipoContratoId', sql.Int, data.tipoContratoId)
        .input('descripcion', sql.VarChar(70), data.descripcion)
        .input('codigo', sql.VarChar(20), data.codigo)
        .input('fechaVigenciaInicial', sql.Date, data.fechaVigenciaInicial)
        .input('fechaVigenciaFinal', sql.Date, data.fechaVigenciaFinal)
        .input('esPrologaAutomatica', sql.Bit, data.esPrologaAutomatica)
        .input('esAutoIncremento', sql.Bit, data.esAutoIncremento)
        .input('porcentajeIncremento', sql.Decimal(18, 2), data.porcentajeIncremento)
        .execute('[cup].[CreateTerceroContrato]')

      const response: GetTerceroContratoDto = { ...result.recordset[0] };

      return response;

    } catch (error) {
      this.ExceptionHandler(error);
    }
  }

  async findAll(id: number, data: FilterTerceroContratoDto) {
    try {
      const pool = await sql.connect(this.config.configBd())
      const result = await pool.request()
        .input('terceroId', sql.Int, id)
        .input('page', sql.Int, data.page ? data.page : 0)
        .input('rowsByPag', sql.Int, data.rowsByPag ? data.rowsByPag : 10)
        .input('codigo', sql.VarChar(20), data.codigo)
        .execute('[cup].[GetAllTerceroContratosByterceroId]')

      const response = new ResponseModel<GetTerceroContratoDto>();
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
        .input('terceroContratoId', sql.Int, id)
        .execute('[cup].[GetTerceroContratoById]')

      if (result.recordset[0] === undefined) {
        throw new NotFoundException(copy.DatosNoEncontrados);
      }

      const response: GetTerceroContratoDto = { ...result.recordset[0] };

      return response;
    } catch (error) {
      this.ExceptionHandler(error);
    }
  }

  async update(id: number, data: UpdateTerceroContratoDto, ususarioId: any) {
    try {

      const pool = await sql.connect(this.config.configBd())
      const result = await pool.request()
        .input('usuarioId', sql.VarChar, ususarioId)
        .input('terceroContratoId', sql.Int, id)
        .input('terceroId', sql.Int, data.terceroId)
        .input('tipoContratoId', sql.Int, data.tipoContratoId)
        .input('descripcion', sql.VarChar(70), data.descripcion)
        .input('codigo', sql.VarChar(20), data.codigo)
        .input('fechaVigenciaInicial', sql.Date, data.fechaVigenciaInicial)
        .input('fechaVigenciaFinal', sql.Date, data.fechaVigenciaFinal)
        .input('esPrologaAutomatica', sql.Bit, data.esPrologaAutomatica)
        .input('esAutoIncremento', sql.Bit, data.esAutoIncremento)
        .input('porcentajeIncremento', sql.Decimal(18, 2), data.porcentajeIncremento)
        .execute('[cup].[UpdateTerceroContrato]')

      const response: GetTerceroContratoDto = { ...result.recordset[0] };

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
        .input('terceroContratoId', sql.Int, id)
        .execute('[cup].[DeleteTerceroContrato]')

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
