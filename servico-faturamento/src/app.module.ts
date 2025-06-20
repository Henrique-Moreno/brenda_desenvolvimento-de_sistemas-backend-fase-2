import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CobrancaModule } from './interface/controllers/cobranca.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    ClientsModule.registerAsync([
      {
        name: 'GESTAO_SERVICE',
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => {
          const rabbitMqUri = configService.get<string>('RABBITMQ_URI');
          if (!rabbitMqUri) {
            throw new Error('RABBITMQ_URI não está definido no arquivo .env');
          }
          return {
            transport: Transport.RMQ,
            options: {
              urls: [rabbitMqUri],
              queue: 'gestao_queue',
              queueOptions: {
                durable: true,
              },
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
    CobrancaModule,
  ],
})
export class AppModule {}