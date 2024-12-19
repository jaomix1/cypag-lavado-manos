import { Controller, Get, Post, Body, Param, Delete, UseFilters, HttpException, UseGuards, Req, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { HttpExceptionFilter } from 'src/common/http-exception.filter';
import { JwtAuthGuard } from 'src/common/jwt/jwt-auth-guard';
import { Roles } from 'src/common/role/roles.decorator';
import { RoleApp } from 'src/common/role/role-app.enum';
import { ErrorModel } from 'src/common/model/error';
import { ResponseModel } from 'src/common/model/response';

import { CreateTerceroContratoDto } from './dto/create-tercero-contrato.dto';
import { GetTerceroContratoDto } from './dto/get-tercero-contrato.dto';
import { FilterTerceroContratoDto } from './dto/filter-tercero-contrato.dto';
import { UpdateTerceroContratoDto } from './dto/update-tercero-contrato.dto';

import { TerceroContratosService } from './tercero-contratos.service';

@ApiTags('tercero-contratos')
@Controller('tercero-contratos')

@UseFilters(new HttpExceptionFilter())
@UseGuards(JwtAuthGuard)
@Roles(RoleApp.User)
export class TerceroContratosController {
  constructor(private readonly service: TerceroContratosService) { }

  @Post()
  @ApiResponse({ status: 200, description: 'obtener registros', type: GetTerceroContratoDto })
  @ApiResponse({ status: 400, description: 'Error controlado', type: ErrorModel })
  async create(@Body() data: CreateTerceroContratoDto, @Req() request) {
    try {
      return await this.service.create(data, request.user.sub);
    } catch (error) {
      throw new HttpException(error.response.message, error.getStatus());
    }
  }

  @Post('all/:terceroId')
  @ApiResponse({ status: 200, description: 'obtener registros', type: ResponseModel<GetTerceroContratoDto> })
  @ApiResponse({ status: 400, description: 'Error controlado', type: ErrorModel })
  async findAll(@Param('terceroId') id: number, @Body() data: FilterTerceroContratoDto) {
    try {
      return await this.service.findAll(id, data);
    } catch (error) {
      throw new HttpException(error.response.message, error.getStatus());
    }
  }

  @Get(':TerceroContratoId')
  @ApiResponse({ status: 200, description: 'obtener registros', type: GetTerceroContratoDto })
  @ApiResponse({ status: 400, description: 'Error controlado', type: ErrorModel })
  async findOne(@Param('TerceroContratoId') id: number) {
    try {
      return await this.service.findOne(+id);
    } catch (error) {
      throw new HttpException(error.response.message, error.getStatus());
    }
  }

  @Put(':TerceroContratoId')
  @ApiResponse({ status: 200, description: 'obtener registros', type: GetTerceroContratoDto })
  @ApiResponse({ status: 400, description: 'Error controlado', type: ErrorModel })
  async update(@Param('TerceroContratoId') id: string, @Body() updateTerceroContratoDto: UpdateTerceroContratoDto, @Req() request) {
    try {
      return await this.service.update(+id, updateTerceroContratoDto, request.user.sub);
    } catch (error) {
      throw new HttpException(error.response.message, error.getStatus());
    }
  }

  @Delete(':TerceroContratoId')
  @ApiResponse({ status: 200, description: 'obtener registros', type: Boolean })
  @ApiResponse({ status: 400, description: 'Error controlado', type: ErrorModel })
  async remove(@Param('TerceroContratoId') id: string, @Req() request) {
    try {
      return await this.service.remove(+id, request.user.sub);
    } catch (error) {
      throw new HttpException(error.response.message, error.getStatus());
    }
  }
}
