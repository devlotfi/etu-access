import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { EnvDefinition } from './shared/types/env-definition';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { PrismaExceptionFilter } from './shared/filters/prisma-exception-filter';
import { PaginationResult } from './shared/types/pagination-result';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<EnvDefinition>);

  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new PrismaExceptionFilter());
  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Etu Access')
    .setDescription('The api for Etu Access automatic attendance system')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () =>
    SwaggerModule.createDocument(app, config, {
      extraModels: [PaginationResult],
    });
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(configService.getOrThrow<number>('PORT'));
}
bootstrap();
