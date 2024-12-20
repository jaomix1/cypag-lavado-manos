import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('LavadoDeManos API')
    .setDescription('The LavadoDeManos API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  const port = process.env.PORT || 3001;

  app.enableCors({
    origin: [
      'http://localhost:47080',
      'http://remotodg.previsalud.net:47080',
      'http://localhost:47083',
      'http://remotodg.previsalud.net:47083',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,

  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);
}
bootstrap();
