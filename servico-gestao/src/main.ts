import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const rabbitMqUri = configService.get<string>('RABBITMQ_URI');
  if (!rabbitMqUri) {
    throw new Error('RABBITMQ_URI não está definido no arquivo .env');
  }

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [rabbitMqUri],
      queue: 'gestao_queue',
      queueOptions: {
        durable: true,
      },
      noAck: false,
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);
}

bootstrap();