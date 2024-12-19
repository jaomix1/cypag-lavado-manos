import { Module } from '@nestjs/common';
import { ComboService } from './combo.service';
import { ComboController } from './combo.controller';
import { ConfigModule } from '@nestjs/config';
import { MyConfig } from 'src/common/config';

@Module({
  imports: [ConfigModule],
  controllers: [ComboController],
  providers: [ComboService, MyConfig],
})
export class ComboModule { }
