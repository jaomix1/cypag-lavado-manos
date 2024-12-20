import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MyConfig } from 'src/common/config';
import { TipoContratoController } from './tipo-contrato/tipo-contrato.controller';
import { TipoContratoService } from './tipo-contrato/tipo-contrato.service';

@Module({
  imports: [
    //ConfigModule
  ],
  controllers: [
    TipoContratoController,
  ],
  providers: [
    TipoContratoService,
    MyConfig,
  ],
})
export class CrudsModule { }
