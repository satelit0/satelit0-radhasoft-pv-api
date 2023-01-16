import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { Transform } from 'class-transformer';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, 
    forbidNonWhitelisted: true,
    transform: true,
    // stopAtFirstError: true,

  }));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('API Documentation Radhasoft-pv')
    .setDescription('Documentation for modules: sales, accounting, Inventory, etc.')
    .setContact('Francisco Valdez', '', 'fvaldezf@radhasoft.net')
    .setVersion('1.0')
    .addSecurity('Authentication', {type: 'apiKey'})
    .build();
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.use(cookieParser());
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(3000);
}
bootstrap();
