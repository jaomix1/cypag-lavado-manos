import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseFilters, UseGuards, Put, HttpException } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorModel } from 'src/common/model/error';
import { HttpExceptionFilter } from 'src/common/http-exception.filter';
import { Roles } from 'src/common/role/roles.decorator';
import { RoleApp } from 'src/common/role/role-app.enum';
import { JwtAuthGuard } from 'src/common/jwt/jwt-auth-guard';

import { GetGrupoDto } from './dto/get-grupo.dto';
import { CreateGrupoDto } from './dto/create-grupo.dto';
import { UpdateGrupoDto } from './dto/update-grupo.dto';

import { GrupoService } from './grupo.service';

@ApiTags('cruds')
@Controller('crud/grupos')

@UseFilters(new HttpExceptionFilter())
@UseGuards(JwtAuthGuard)
@Roles(RoleApp.User)
export class GrupoController {
  constructor(private readonly service: GrupoService) { }

  @Post()
  @ApiResponse({ status: 200, description: 'obtener registros', type: Boolean })
  @ApiResponse({ status: 400, description: 'Error controlado', type: ErrorModel })
  async create(@Body() data: CreateGrupoDto, @Req() request) {
    try {
      return this.service.create(data, request.user.sub);
    } catch (error) {
      throw new HttpException(error.response.message, error.getStatus());
    }
  }

  @Post('all')
  @ApiResponse({ status: 200, description: 'obtener registros', type: [GetGrupoDto] })
  @ApiResponse({ status: 400, description: 'Error controlado', type: ErrorModel })
  findAll() {
    try {
      return this.service.findAll();
    } catch (error) {
      throw new HttpException(error.response.message, error.getStatus());
    }
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'obtener registros', type: Boolean })
  @ApiResponse({ status: 400, description: 'Error controlado', type: ErrorModel })
  findOne(@Param('id') id: string) {
    try {
      return this.service.findOne(+id);
    } catch (error) {
      throw new HttpException(error.response.message, error.getStatus());
    }
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'obtener registros', type: Boolean })
  @ApiResponse({ status: 400, description: 'Error controlado', type: ErrorModel })
  update(@Param('id') id: string, @Body() updateGrupoDto: UpdateGrupoDto, @Req() request) {
    try {
      return this.service.update(+id, updateGrupoDto, request.user.sub);
    } catch (error) {
      throw new HttpException(error.response.message, error.getStatus());
    }
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'obtener registros', type: Boolean })
  @ApiResponse({ status: 400, description: 'Error controlado', type: ErrorModel })
  remove(@Param('id') id: string) {
    try {
      return this.service.remove(+id);
    } catch (error) {
      throw new HttpException(error.response.message, error.getStatus());
    }
  }
}
