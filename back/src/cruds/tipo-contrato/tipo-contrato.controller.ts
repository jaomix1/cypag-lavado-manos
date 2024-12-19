import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseFilters, UseGuards, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorModel } from 'src/common/model/error';
import { HttpExceptionFilter } from 'src/common/http-exception.filter';
import { Roles } from 'src/common/role/roles.decorator';
import { RoleApp } from 'src/common/role/role-app.enum';
import { JwtAuthGuard } from 'src/common/jwt/jwt-auth-guard';

import { GetTipoContratoDto } from './dto/get-tipo-contrato.dto';
import { CreateTipoContratoDto } from './dto/create-tipo-contrato.dto';
import { UpdateTipoContratoDto } from './dto/update-tipo-contrato.dto';

import { TipoContratoService } from './tipo-contrato.service';

@ApiTags('cruds')
@Controller('crud/tipo-contratos')

@UseFilters(new HttpExceptionFilter())
@UseGuards(JwtAuthGuard)
@Roles(RoleApp.User)
export class TipoContratoController {
  constructor(private readonly service: TipoContratoService) { }

  @Post()
  @ApiResponse({ status: 200, description: 'obtener registros', type: Boolean })
  @ApiResponse({ status: 400, description: 'Error controlado', type: ErrorModel })
  async create(@Body() data: CreateTipoContratoDto, @Req() request) {
    return this.service.create(data, request.user.sub);
  }

  @Post('all')
  @ApiResponse({ status: 200, description: 'obtener registros', type: [GetTipoContratoDto] })
  @ApiResponse({ status: 400, description: 'Error controlado', type: ErrorModel })
  findAll() {
    return this.service.findAll();
  }

  @Get(':tipoContratoId')
  @ApiResponse({ status: 200, description: 'obtener registros', type: Boolean })
  @ApiResponse({ status: 400, description: 'Error controlado', type: ErrorModel })
  findOne(@Param('tipoContratoId') id: string) {
    return this.service.findOne(+id);
  }

  @Put(':tipoContratoId')
  @ApiResponse({ status: 200, description: 'obtener registros', type: Boolean })
  @ApiResponse({ status: 400, description: 'Error controlado', type: ErrorModel })
  update(@Param('tipoContratoId') id: string, @Body() updateTipoContratoDto: UpdateTipoContratoDto, @Req() request) {
    return this.service.update(+id, updateTipoContratoDto, request.user.sub);
  }

  @Delete(':tipoContratoId')
  @ApiResponse({ status: 200, description: 'obtener registros', type: Boolean })
  @ApiResponse({ status: 400, description: 'Error controlado', type: ErrorModel })
  remove(@Param('tipoContratoId') id: string) {
    return this.service.remove(+id);
  }
}
