import { Controller, Get, Post, Body, Param, Delete, UseFilters, BadRequestException, UseGuards, Req, Put, HttpException } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { HttpExceptionFilter } from 'src/common/http-exception.filter';
import { JwtAuthGuard } from 'src/common/jwt/jwt-auth-guard';
import { Roles } from 'src/common/role/roles.decorator';
import { ErrorModel } from 'src/common/model/error';
import { ResponseModel } from 'src/common/model/response';
import { RoleApp } from 'src/common/role/role-app.enum';

import { CreateCupSedeDto } from './dto/create-cup-sede.dto';
import { UpdateCupSedeDto } from './dto/update-cup-sede.dto';
import { GetCupSedeDto } from './dto/get-cup-sede.dto';
import { FilterCupSedeDto } from './dto/filter-cup-sede.dto';

import { CupSedesService } from './cup-sedes.service';

@ApiTags('cup-sedes')
@Controller('cup-sedes')

@UseFilters(new HttpExceptionFilter())
@UseGuards(JwtAuthGuard)
@Roles(RoleApp.User)
export class CupSedesController {
  constructor(private readonly service: CupSedesService) { }

  @Post()
  @ApiResponse({ status: 200, description: 'obtener registros', type: GetCupSedeDto })
  @ApiResponse({ status: 400, description: 'Error controlado', type: ErrorModel })
  async create(@Body() data: CreateCupSedeDto, @Req() request) {
    try {
      return await this.service.create(data, request.user.sub);
    } catch (error) {
      throw new HttpException(error.response.message, error.getStatus());
    }
  }

  @Post('all/:cupId')
  @ApiResponse({ status: 200, description: 'obtener registros', type: ResponseModel<GetCupSedeDto> })
  @ApiResponse({ status: 400, description: 'Error controlado', type: ErrorModel })
  async findAll(@Param('cupId') id: number, @Body() data: FilterCupSedeDto) {
    try {
      return await this.service.findAll(id, data);
    } catch (error) {
      throw new HttpException(error.response.message, error.getStatus());
    }
  }

  @Get(':cupId')
  @ApiResponse({ status: 200, description: 'obtener registros', type: GetCupSedeDto })
  @ApiResponse({ status: 400, description: 'Error controlado', type: ErrorModel })
  async findOne(@Param('cupId') id: number) {
    try {
      return await this.service.findOne(+id);
    } catch (error) {
      throw new HttpException(error.response.message, error.getStatus());
    }
  }

  @Put(':cupId')
  @ApiResponse({ status: 200, description: 'obtener registros', type: GetCupSedeDto })
  @ApiResponse({ status: 400, description: 'Error controlado', type: ErrorModel })
  async update(@Param('cupId') id: string, @Body() updateCupSedeDto: UpdateCupSedeDto, @Req() request) {
    try {
      return await this.service.update(+id, updateCupSedeDto, request.user.sub);
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
