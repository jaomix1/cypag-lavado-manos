import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MyConfig } from 'src/common/config';

import { LavadoDeManosController } from './lavadoDeManos.controller';

import { LavadoDeManosService } from './lavadoDeManos.service';

@Module({
  imports: [
  ],
  controllers: [
    LavadoDeManosController
  ],
  providers: [
    LavadoDeManosService,
    MyConfig
  ],
})
export class LavadoDeManosModule { }
