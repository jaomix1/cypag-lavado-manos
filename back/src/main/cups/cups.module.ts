import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MyConfig } from 'src/common/config';

import { CupsController } from './cups.controller';

import { CupsService } from './cups.service';

@Module({
  imports: [
  ],
  controllers: [
    CupsController
  ],
  providers: [
    CupsService,
    MyConfig
  ],
})
export class CupsModule { }
