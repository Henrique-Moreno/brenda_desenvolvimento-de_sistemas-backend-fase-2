import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { CreateCobrancaDto } from '../../application/dtos/cobranca.dto';

@Injectable()
export class GestaoMessagingService {
  private client: ClientProxy;

  constructor(private configService: ConfigService) {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.get<string>('RABBITMQ_URI') || 'amqp://guest:guest@localhost:5672'],
        queue: 'gestao_queue',
        queueOptions: {
          durable: true,
        },
      },
    });
  }

  async notifyCobrancaCreated(dto: CreateCobrancaDto): Promise<void> {
    this.client.emit('cobranca.created', dto);
  }
}