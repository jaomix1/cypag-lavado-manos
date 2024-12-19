import { BadRequestException, Injectable, HttpException, InternalServerErrorException } from '@nestjs/common';
import * as sql from 'mssql';

import { MyConfig } from 'src/common/config';
import { CreateParametroDto } from './dto/create-parametro.dto';
import { UpdateParametroDto } from './dto/update-parametro.dto';
import { Paginator } from 'src/common/model/paginator';
import { GetParametroDto } from './dto/get-parametro.dto';

@Injectable()
export class ParametroService {
  constructor(private config: MyConfig) { }

  async create(data: CreateParametroDto, ususarioId: string) {
    try {

      const pool = await sql.connect(this.config.configBd())
      const result = await pool.request()
        .input('usuarioId', sql.VarChar, ususarioId)
        .input('nombre', sql.VarChar(50), data.nombre)
        .input('valor', sql.VarChar(50), data.valor)
        .query("INSERT INTO [cup].[Parametros] ([Descripcion]) VALUES (@nombre);")

      return true;

    } catch (error) {
      this.ExceptionHandler(error);
    }
  }

  async findAll() {
    try {

      const pool = await sql.connect(this.config.configBd())
      const result = await pool.request()
        .query("SELECT id, nombre, valor FROM [cup].[Parametros] WHERE [Estado] = 'ACT';")

      return result.recordset;

    } catch (error) {
      this.ExceptionHandler(error);
    }
  }

  async findOne(id: number) {
    try {

      const pool = await sql.connect(this.config.configBd())
      const result = await pool.request()
        .input('id', sql.Int, id)
        .query("SELECT TOP 1 id, nombre, valor FROM [cup].[Parametros] WHERE [Id] = @id AND [Estado] = 'ACT';")

      const response: GetParametroDto = { ...result.recordset[0] };

      return response;

    } catch (error) {
      this.ExceptionHandler(error);
    }
  }

  async update(id: number, data: UpdateParametroDto, ususarioId: string) {
    try {

      const pool = await sql.connect(this.config.configBd())
      const result = await pool.request()
        .input('usuarioId', sql.VarChar, ususarioId)
        .input('id', sql.Int, id)
        .input('nombre', sql.VarChar(50), data.nombre)
        .input('valor', sql.VarChar(50), data.valor)
        .query("UPDATE TOP(1) [cup].[Parametros] SET [Descripcion]=@nombre, [FechaModificacion]=GETDATE() WHERE ([Id]=@id)")

      return true;

    } catch (error) {
      this.ExceptionHandler(error);
    }
  }

  async remove(id: number) {
    try {

      const pool = await sql.connect(this.config.configBd())
      const result = await pool.request()
        .input('id', sql.Int, id)
        .query("UPDATE TOP(1) [cup].[Parametros] SET [Estado]='INA', [FechaModificacion]=GETDATE() WHERE ([Id]=@id)")

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
