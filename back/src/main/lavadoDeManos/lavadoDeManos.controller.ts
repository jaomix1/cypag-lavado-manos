import { Controller, Get, Post, Body, Param, Delete, UseFilters, BadRequestException, UseGuards, Req, Put, HttpException } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { HttpExceptionFilter } from 'src/common/http-exception.filter';
import { JwtAuthGuard } from 'src/common/jwt/jwt-auth-guard';
import { Roles } from 'src/common/role/roles.decorator';
import { RoleApp } from 'src/common/role/role-app.enum';
import { ErrorModel } from 'src/common/model/error';
import { ResponseModel } from 'src/common/model/response';

import { CreateCupDto } from './dto/create-cup.dto';
import { GetCupDto } from './dto/get-cup.dto';
import { FilterCupDto } from './dto/filter-cup.dto';
import { UpdateCupDto } from './dto/update-cup.dto';

import { LavadoDeManosService } from './lavadoDeManos.service';

@ApiTags('lavadoDeManos')
@Controller('lavadoDeManos')

@UseFilters(new HttpExceptionFilter())
@UseGuards(JwtAuthGuard)
@Roles(RoleApp.User)
export class LavadoDeManosController {
  constructor(private readonly service: LavadoDeManosService) { }

  @Post()
  @ApiResponse({ status: 200, description: 'obtener registros', type: GetCupDto })
  @ApiResponse({ status: 400, description: 'Error controlado', type: ErrorModel })
  async create(@Body() data: CreateCupDto, @Req() request) {
    try {
      return await this.service.create(data, request.user.sub);
    } catch (error) {
      throw new HttpException(error.response.message, error.getStatus());
    }
  }

  @Post('all')
  @ApiResponse({ status: 200, description: 'obtener registros', type: ResponseModel<GetCupDto> })
  @ApiResponse({ status: 400, description: 'Error controlado', type: ErrorModel })
  async findAll(@Body() data: FilterCupDto) {
    try {
      return await this.service.findAll(data);
    } catch (error) {
      throw new HttpException(error.response.message, error.getStatus());
    }
  }

  @Get(':cupId')
  @ApiResponse({ status: 200, description: 'obtener registros', type: GetCupDto })
  @ApiResponse({ status: 400, description: 'Error controlado', type: ErrorModel })
  async findOne(@Param('cupId') id: number) {
    try {
      return await this.service.findOne(+id);
    } catch (error) {
      throw new HttpException(error.response.message, error.getStatus());
    }
  }

  @Put(':cupId')
  @ApiResponse({ status: 200, description: 'obtener registros', type: GetCupDto })
  @ApiResponse({ status: 400, description: 'Error controlado', type: ErrorModel })
  async update(@Param('cupId') id: string, @Body() updateCupDto: UpdateCupDto, @Req() request) {
    try {
      return await this.service.update(+id, updateCupDto, request.user.sub);
    } catch (error) {
      throw new HttpException(error.response.message, error.getStatus());
    }
  }

  @Delete(':cupId')
  @ApiResponse({ status: 200, description: 'obtener registros', type: Boolean })
  @ApiResponse({ status: 400, description: 'Error controlado', type: ErrorModel })
  async remove(@Param('cupId') id: string, @Req() request) {
    try {
      return await this.service.remove(+id, request.user.sub);
    } catch (error) {
      throw new HttpException(error.response.message, error.getStatus());
    }
  }
}
