import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Shilltube Backend API service')
    .setDescription('API for the Shilltube API Service')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup("api/docs", app, document);

  const port = configService.get<number>('PORT', 3000);
  await app.listen(port, "0.0.0.0");

  console.log(`Shilltube Backend is running on: ${await app.getUrl()}`);
}
bootstrap();
