import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from 'config';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);

  const serverPort = config.get('server.port');

  const port = 3000;
  await app.listen(serverPort);
  logger.log(`Application running on port ${port}`);
}
bootstrap();
