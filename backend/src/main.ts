import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: '*',
  });

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('My Game Library')
    .setDescription('Documentação do projeto My Game Library ')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(process.env.PORT ?? 3033);
}
bootstrap().catch((error) => {
  console.error('Error during application bootstrap:', error);
});
