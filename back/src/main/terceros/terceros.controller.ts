import { Controller, Get, Post, Body, Param, Delete, UseFilters, HttpException, UseGuards, Req, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { HttpExceptionFilter } from 'src/common/http-exception.filter';
import { JwtAuthGuard } from 'src/common/jwt/jwt-auth-guard';
import { Roles } from 'src/common/role/roles.decorator';
import { RoleApp } from 'src/common/role/role-app.enum';
import { ErrorModel } from 'src/common/model/error';
import { ResponseModel } from 'src/common/model/response';

import { CreateTerceroDto } from './dto/create-tercero.dto';
import { GetTerceroDto } from './dto/get-tercero.dto';
import { FilterTerceroDto } from './dto/filter-tercero.dto';
import { UpdateTerceroDto } from './dto/update-tercero.dto';

import { TercerosService } from './terceros.service';

@ApiTags('terceros')
@Controller('terceros')

@UseFilters(new HttpExceptionFilter())
@UseGuards(JwtAuthGuard)
@Roles(RoleApp.User)
export class TercerosController {
  constructor(private readonly service: TercerosService) { }

  @Post()
  @ApiResponse({ status: 200, description: 'obtener registros', type: GetTerceroDto })
  @ApiResponse({ status: 400, description: 'Error controlado', type: ErrorModel })
  async create(@Body() data: CreateTerceroDto, @Req() request) {
    try {
      return await this.service.create(data, request.user.sub);
    } catch (error) {
      throw new HttpException(error.response.message, error.getStatus());
    }
  }

  @Post('all')
  @ApiResponse({ status: 200, description: 'obtener registros', type: ResponseModel<GetTerceroDto> })
  @ApiResponse({ status: 400, description: 'Error controlado', type: ErrorModel })
  async findAll(@Body() data: FilterTerceroDto) {
    try {
      return await this.service.findAll(data);
    } catch (error) {
      throw new HttpException(error.response.message, error.getStatus());
    }
  }

  @Get(':terceroId')
  @ApiResponse({ status: 200, description: 'obtener registros', type: GetTerceroDto })
  @ApiResponse({ status: 400, description: 'Error controlado', type: ErrorModel })
  async findOne(@Param('terceroId') id: number) {
    try {
      return await this.service.findOne(+id);
    } catch (error) {
      throw new HttpException(error.response.message, error.getStatus());
    }
  }

  @Put(':terceroId')
  @ApiResponse({ status: 200, description: 'obtener registros', type: GetTerceroDto })
  @ApiResponse({ status: 400, description: 'Error controlado', type: ErrorModel })
  async update(@Param('terceroId') id: string, @Body() updateTerceroDto: UpdateTerceroDto, @Req() request) {
    try {
      return await this.service.update(+id, updateTerceroDto, request.user.sub);
    } catch (error) {
      throw new HttpException(error.response.message, error.getStatus());
    }
  }

  @Delete(':terceroId')
  @ApiResponse({ status: 200, description: 'obtener registros', type: Boolean })
  @ApiResponse({ status: 400, description: 'Error controlado', type: ErrorModel })
  async remove(@Param('terceroId') id: string, @Req() request) {
    try {
      return await this.service.remove(+id, request.user.sub);
    } catch (error) {
      throw new HttpException(error.response.message, error.getStatus());
    }
  }
}
