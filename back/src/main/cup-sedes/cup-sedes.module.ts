import { Module } from '@nestjs/common';
import { CupSedesService } from './cup-sedes.service';
import { CupSedesController } from './cup-sedes.controller';
import { MyConfig } from 'src/common/config';

@Module({
  controllers: [
    CupSedesController
  ],
  providers: [
    CupSedesService,
    MyConfig
  ],
})
export class CupSedesModule { }
