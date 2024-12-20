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

}
