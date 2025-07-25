import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const configDoc = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('API docs for Home Library Service')
    .setVersion('v1.0')
    .addBearerAuth()
    .build();

  const doc = SwaggerModule.createDocument(app, configDoc);
  SwaggerModule.setup('doc', app, doc);

  const configService = app.get(ConfigService);
  const port = (configService.get('PORT') as number) || 4000;

  await app.listen(port);
  console.log(`Server is running on: http://localhost:${port}`);
}
bootstrap();
