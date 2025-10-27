import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { writeFileSync } from 'node:fs';
import { auth } from '../lib/auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });

  // Helmet middleware for security headers
  app.use(helmet());

  const config = new DocumentBuilder()
    .setTitle('Private API')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const betterAuthDocument = await auth.api.generateOpenAPISchema();
  // JSON OpenAPI
  writeFileSync(
    join(process.cwd(), 'api-openapi.json'),
    JSON.stringify(document, null, 2),
  );
  // JSON BetterAuth OpenAPI
  writeFileSync(
    join(process.cwd(), 'better-auth-openapi.json'),
    JSON.stringify(betterAuthDocument, null, 2),
  );

  await app.listen(process.env.PORT ?? 3001);
}

bootstrap();
