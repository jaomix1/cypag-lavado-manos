import { BadRequestException, HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as sql from 'mssql';

import { MyConfig } from 'src/common/config';


import { CreateSubGrupoDto } from './dto/create-sub-grupo.dto';
import { UpdateSubGrupoDto } from './dto/update-sub-grupo.dto';
import { Paginator } from 'src/common/model/paginator';
import { GetSubGrupoDto } from './dto/get-sub-grupo.dto';

@Injectable()
export class SubGrupoService {
  constructor(private config: MyConfig) {
  }

  async create(data: CreateSubGrupoDto, ususarioId: string) {
    try {

      const pool = await sql.connect(this.config.configBd())
      const result = await pool.request()
        .input('usuarioId', sql.VarChar, ususarioId)
        .input('descripcion', sql.VarChar(120), data.descripcion)
        .query("INSERT INTO [cup].[Sec_Sub_Grupo] ([Descripcion]) VALUES (@descripcion);")

      return true;

    } catch (error) {
      this.ExceptionHandler(error);
    }
  }

  async findAll() {
    try {

      const pool = await sql.connect(this.config.configBd())
      const result = await pool.request()
        .query("SELECT id, descripcion FROM [cup].[Sec_Sub_Grupo] WHERE [Estado] = 'ACT';")

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
        .query("SELECT TOP 1 id, descripcion FROM [cup].[Sec_Sub_Grupo] WHERE [Id] = @id AND [Estado] = 'ACT';")

      const response: GetSubGrupoDto = { ...result.recordset[0] };

      return response;

    } catch (error) {
      this.ExceptionHandler(error);
    }
  }

  async update(id: number, data: UpdateSubGrupoDto, ususarioId: string) {
    try {

      const pool = await sql.connect(this.config.configBd())
      const result = await pool.request()
        .input('usuarioId', sql.VarChar, ususarioId)
        .input('id', sql.Int, id)
        .input('descripcion', sql.VarChar(120), data.descripcion)
        .query("UPDATE TOP(1) [cup].[Sec_Sub_Grupo] SET [Descripcion]=@descripcion, [FechaModificacion]=GETDATE() WHERE ([Id]=@id)")

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
        .query("UPDATE TOP(1) [cup].[Sec_Sub_Grupo] SET [Estado]='INA', [FechaModificacion]=GETDATE() WHERE ([Id]=@id)")

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
