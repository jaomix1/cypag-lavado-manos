import { BadRequestException, HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as sql from 'mssql';

import { MyConfig } from 'src/common/config';
import { ResponseModel } from 'src/common/model/response';

import { CreateCupDto } from './dto/create-cup.dto';
import { UpdateCupDto } from './dto/update-cup.dto';
import { GetCupDto } from './dto/get-cup.dto';
import { FilterCupDto } from './dto/filter-cup.dto';
import { copy } from 'src/common/copy';

@Injectable()
export class CupsService {
  constructor(private config: MyConfig) {
  }

  async create(data: CreateCupDto, ususarioId: any) {
    try {

      const pool = await sql.connect(this.config.configBd())
      const result = await pool.request()
        .input('usuarioId', sql.VarChar, ususarioId)
        .input('codigo', sql.VarChar(20), data.codigo)
        .input('descripcion', sql.VarChar(70), data.descripcion)
        .input('codigoSoat', sql.VarChar(20), data.codigoSoat)
        .input('uvrIss', sql.Decimal(18, 2), data.uvrIss)
        .input('valorIss', sql.Decimal(18, 2), data.valorIss)
        .input('soatGrupoId', sql.Int, data.soatGrupoId)
        .input('valorSoat', sql.Decimal(18, 2), data.valorSoat)
        .input('grupoId', sql.Int, data.grupoId)
        .input('subGrupoId', sql.Int, data.subGrupoId)
        .execute('[cup].[CreateCup]')

      const response: GetCupDto = { ...result.recordset[0] };

      return response;

    } catch (error) {
      this.ExceptionHandler(error);
    }
  }

  async findAll(data: FilterCupDto) {
    try {
      const pool = await sql.connect(this.config.configBd())
      const result = await pool.request()
        .input('page', sql.Int, data.page ? data.page : 0)
        .input('rowsByPag', sql.Int, data.rowsByPag ? data.rowsByPag : 10)
        .input('codigo', sql.VarChar(20), data.codigo)
        .execute('cup.GetAllCups')

      const response = new ResponseModel<GetCupDto>();
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
        .input('cupId', sql.Int, id)
        .execute('[cup].[GetCupById]')

      if (result.recordset[0] === undefined) {
        throw new BadRequestException(copy.DatosNoEncontrados);
      }

      const response: GetCupDto = { ...result.recordset[0] };

      return response;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        this.ExceptionHandler(error);
      }
    }
  }

  async update(id: number, data: UpdateCupDto, ususarioId: any) {
    try {

      const pool = await sql.connect(this.config.configBd())
      const result = await pool.request()
        .input('usuarioId', sql.VarChar, ususarioId)
        .input('cupId', sql.Int, id)
        .input('codigo', sql.VarChar(20), data.codigo)
        .input('descripcion', sql.VarChar(70), data.descripcion)
        .input('codigoSoat', sql.VarChar(20), data.codigoSoat)
        .input('uvrIss', sql.Decimal(18, 2), data.uvrIss)
        .input('valorIss', sql.Decimal(18, 2), data.valorIss)
        .input('soatGrupoId', sql.Int, data.soatGrupoId)
        .input('valorSoat', sql.Decimal(18, 2), data.valorSoat)
        .input('grupoId', sql.Int, data.grupoId)
        .input('subGrupoId', sql.Int, data.subGrupoId)
        .execute('[cup].[UpdateCup]')

      const response: GetCupDto = { ...result.recordset[0] };

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
        .input('cupId', sql.Int, id)
        .execute('[cup].[DeleteCup]')

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
