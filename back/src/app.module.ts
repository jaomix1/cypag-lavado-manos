import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LavadoDeManosModule } from './main/lavadoDeManos/lavadoDeManos.module';
import { CrudsModule } from './cruds/cruds.module';
import { RolesGuard } from './common/role/roles.guard';
import { JwtStrategy } from './common/jwt/jwt-strategy';
import { PostStatusInterceptor } from './common/post-status.interceptor';
import { JwtModule } from '@nestjs/jwt';
import { ComboModule } from './combos/combo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    JwtModule.register({
      global: true,
      secret: process.env.TOKEN_SECRET,
      signOptions: { expiresIn: '1000h' },
    }),
    ComboModule,
    CrudsModule,

    LavadoDeManosModule,
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    JwtStrategy,
    {
      provide: APP_INTERCEPTOR,
      useClass: PostStatusInterceptor
    }
  ],
})
export class AppModule { }
