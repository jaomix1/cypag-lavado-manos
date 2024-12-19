import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MyConfig } from 'src/common/config';

import { TercerosController } from './terceros.controller';

import { TercerosService } from './terceros.service';

@Module({
  imports: [
  ],
  controllers: [
    TercerosController
  ],
  providers: [
    TercerosService,
    MyConfig
  ],
})
export class TercerosModule { }
