import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Cobranca, CobrancaSchema } from '../../domain/entities/cobranca.entity';
import { CobrancaRepository } from '../../infrastructure/repositories/cobranca.repository';
import { CobrancaService } from '../../application/services/cobranca.service';
import { CobrancaController } from './cobranca.controller';
import { GestaoMessagingService } from '../../infrastructure/messaging/gestao.messaging.service';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: Cobranca.name, schema: CobrancaSchema }]),
  ],
  controllers: [CobrancaController],
  providers: [
    CobrancaService,
    GestaoMessagingService,
    {
      provide: 'ICobrancaRepository',
      useClass: CobrancaRepository,
    },
  ],
  exports: [CobrancaService, 'ICobrancaRepository'],
})
export class CobrancaModule {}