import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MyConfig } from 'src/common/config';

import { TerceroContratosController } from './tercero-contratos.controller';

import { TerceroContratosService } from './tercero-contratos.service';

@Module({
  imports: [
  ],
  controllers: [
    TerceroContratosController
  ],
  providers: [
    TerceroContratosService,
    MyConfig
  ],
})
export class TerceroContratosModule { }
