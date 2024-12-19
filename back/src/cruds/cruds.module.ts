import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MyConfig } from 'src/common/config';
import { GrupoController } from './grupo/grupo.controller';
import { GrupoService } from './grupo/grupo.service';
import { SubGrupoController } from './sub-grupo/sub-grupo.controller';
import { SubGrupoService } from './sub-grupo/sub-grupo.service';
import { TipoContratoController } from './tipo-contrato/tipo-contrato.controller';
import { TipoContratoService } from './tipo-contrato/tipo-contrato.service';
import { ParametroController } from './parametro/parametro.controller';
import { ParametroService } from './parametro/parametro.service';

@Module({
  imports: [
    //ConfigModule
  ],
  controllers: [
    GrupoController,
    SubGrupoController,
    TipoContratoController,
    ParametroController,
  ],
  providers: [
    GrupoService,
    SubGrupoService,
    TipoContratoService,
    ParametroService,
    MyConfig,
  ],
})
export class CrudsModule { }
