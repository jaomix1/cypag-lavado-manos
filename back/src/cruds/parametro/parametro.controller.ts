import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseFilters, UseGuards, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorModel } from 'src/common/model/error';
import { HttpExceptionFilter } from 'src/common/http-exception.filter';
import { Roles } from 'src/common/role/roles.decorator';
import { RoleApp } from 'src/common/role/role-app.enum';
import { JwtAuthGuard } from 'src/common/jwt/jwt-auth-guard';

import { GetParametroDto } from './dto/get-parametro.dto';
import { CreateParametroDto } from './dto/create-parametro.dto';
import { UpdateParametroDto } from './dto/update-parametro.dto';

import { ParametroService } from './parametro.service';

@ApiTags('cruds')
@Controller('crud/parametros')

@UseFilters(new HttpExceptionFilter())
@UseGuards(JwtAuthGuard)
@Roles(RoleApp.User)
export class ParametroController {
  constructor(private readonly service: ParametroService) { }

  // @Post()
  // @ApiResponse({ status: 200, description: 'obtener registros', type: Boolean })
  // @ApiResponse({ status: 400, description: 'Error controlado', type: ErrorModel })
  // async create(@Body() data: CreateParametroDto, @Req() request) {
  //   return this.service.create(data, request.user.sub);
  // }

  @Post('all')
  @ApiResponse({ status: 200, description: 'obtener registros', type: [GetParametroDto] })
  @ApiResponse({ status: 400, description: 'Error controlado', type: ErrorModel })
  findAll() {
    return this.service.findAll();
  }

  // @Get(':parametroId')
  // @ApiResponse({ status: 200, description: 'obtener registros', type: Boolean })
  // @ApiResponse({ status: 400, description: 'Error controlado', type: ErrorModel })
  // findOne(@Param('parametroId') id: string) {
  //   return this.service.findOne(+id);
  // }

  // @Put(':parametroId')
  // @ApiResponse({ status: 200, description: 'obtener registros', type: Boolean })
  // @ApiResponse({ status: 400, description: 'Error controlado', type: ErrorModel })
  // update(@Param('parametroId') id: string, @Body() updateParametroDto: UpdateParametroDto, @Req() request) {
  //   return this.service.update(+id, updateParametroDto, request.user.sub);
  // }

  // @Delete(':parametroId')
  // @ApiResponse({ status: 200, description: 'obtener registros', type: Boolean })
  // @ApiResponse({ status: 400, description: 'Error controlado', type: ErrorModel })
  // remove(@Param('parametroId') id: string) {
  //   return this.service.remove(+id);
  // }
}
