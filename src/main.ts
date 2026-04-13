import 'dotenv/config';

import { NestFactory } from '@nestjs/core';

import { AppModule } from '@/app.module';

const PORT = process.env.PORT ?? 3001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.FRONTEND_ORIGIN_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(PORT);
  // eslint-disable-next-line no-console
  console.log(`Connected to PORT: ${PORT}`);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
