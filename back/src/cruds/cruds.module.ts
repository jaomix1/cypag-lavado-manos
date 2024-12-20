import { Module } from '@nestjs/common';
import { MyConfig } from 'src/common/config';

@Module({
  imports: [
  ],
  controllers: [
    //TipoContratoController,
  ],
  providers: [
    //TipoContratoService,
    MyConfig,
  ],
})
export class CrudsModule { }
