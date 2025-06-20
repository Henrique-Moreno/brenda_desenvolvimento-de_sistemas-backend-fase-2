import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CobrancaMessagingController } from 'infraestrutura/messaging/cobranca.messaging.controller';
import { PlanoModule } from './plano.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PlanoModule,
  ],
  controllers: [CobrancaMessagingController],
})
export class AppModule {}