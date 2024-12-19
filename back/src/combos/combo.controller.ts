import { BadRequestException, Controller, Get, HttpException, Param, UseFilters, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ComboService } from './combo.service';
import { HttpExceptionFilter } from 'src/common/http-exception.filter';
import { JwtAuthGuard } from 'src/common/jwt/jwt-auth-guard';
import { Roles } from 'src/common/role/roles.decorator';
import { RoleApp } from 'src/common/role/role-app.enum';
import { ErrorModel } from 'src/common/model/error';
import { GetComboDto } from 'src/combos/dto/get-combo.dto';


@ApiTags('cup/combos')
@Controller('combos')
@UseFilters(new HttpExceptionFilter())
@UseGuards(JwtAuthGuard)
@Roles(RoleApp.User, RoleApp.Admin)
export class ComboController {
  constructor(private readonly comboService: ComboService) { }

  // @Get('departamentos')
  // @ApiResponse({ status: 200, description: 'obtener registros', type: [GetComboDto] })
  // @ApiResponse({ status: 400, description: 'Error controlado', type: ErrorModel })
  // async departamentos() {
  //   try {
  //     return await this.comboService.getDepartamentos();
  //   } catch (error) {
  //     throw new HttpException(error.response.message, error.getStatus());
  //   }
  // }

  // @Get('ciudades/:departamentoId')
  // @ApiResponse({ status: 200, description: 'obtener registros', type: [GetComboDto] })
  // @ApiResponse({ status: 400, description: 'Error controlado', type: ErrorModel })
  // async ciudades(@Param('departamentoId') departamentoId: number) {
  //   try {
  //     return await this.comboService.getCiudades(departamentoId);
  //   } catch (error) {
  //     throw new HttpException(error.response.message, error.getStatus());
  //   }
  // }

  @Get('grupos')
  @ApiResponse({ status: 200, description: 'obtener registros', type: [GetComboDto] })
  @ApiResponse({ status: 400, description: 'Error controlado', type: ErrorModel })
  async grupos() {
    try {
      return await this.comboService.GetComboGrupo();
    } catch (error) {
      throw new HttpException(error.response.message, error.getStatus());
    }
  }

  @Get('subGrupos')
  @ApiResponse({ status: 200, description: 'obtener registros', type: [GetComboDto] })
  @ApiResponse({ status: 400, description: 'Error controlado', type: ErrorModel })
  async subGrupos() {
    try {
      return await this.comboService.GetComboSubGrupo();
    } catch (error) {
      throw new HttpException(error.response.message, error.getStatus());
    }
  }


  @Get('tipoContratos')
  @ApiResponse({ status: 200, description: 'obtener registros', type: [GetComboDto] })
  @ApiResponse({ status: 400, description: 'Error controlado', type: ErrorModel })
  async tipoContratistas() {
    try {
      return await this.comboService.GetComboTipoContratista();
    } catch (error) {
      throw new HttpException(error.response.message, error.getStatus());
    }
  }

  @Get('soatGrupos')
  @ApiResponse({ status: 200, description: 'obtener registros', type: [GetComboDto] })
  @ApiResponse({ status: 400, description: 'Error controlado', type: ErrorModel })
  async soatGrupos() {
    try {
      return await this.comboService.GetComboSoatGrupo();
    } catch (error) {
      throw new HttpException(error.response.message, error.getStatus());
    }
  }


  @Get('empresas')
  @ApiResponse({ status: 200, description: 'obtener registros', type: [GetComboDto] })
  @ApiResponse({ status: 400, description: 'Error controlado', type: ErrorModel })
  async empresas() {
    try {
      return await this.comboService.GetComboEmpresa();
    } catch (error) {
      throw new HttpException(error.response.message, error.getStatus());
    }
  }



  @Get('sedes')
  @ApiResponse({ status: 200, description: 'obtener registros', type: [GetComboDto] })
  @ApiResponse({ status: 400, description: 'Error controlado', type: ErrorModel })
  async sedes() {
    try {
      return await this.comboService.GetComboSede();
    } catch (error) {
      throw new HttpException(error.response.message, error.getStatus());
    }
  }

  @Get('sedesByEmpresa/:empresaId')
  @ApiResponse({ status: 200, description: 'obtener registros', type: [GetComboDto] })
  @ApiResponse({ status: 400, description: 'Error controlado', type: ErrorModel })
  async sedesByEmpresa(@Param('empresaId') empresaId: number) {
    try {
      return await this.comboService.GetComboSedesByEmpresa(empresaId);
    } catch (error) {
      throw new HttpException(error.response.message, error.getStatus());
    }
  }

  @Get('tipoDocumentos')
  @ApiResponse({ status: 200, description: 'obtener registros', type: [GetComboDto] })
  @ApiResponse({ status: 400, description: 'Error controlado', type: ErrorModel })
  async TipoDocumentos() {
    try {
      return await this.comboService.GetComboTipoDocumento();
    } catch (error) {
      throw new HttpException(error.response.message, error.getStatus());
    }
  }

}
