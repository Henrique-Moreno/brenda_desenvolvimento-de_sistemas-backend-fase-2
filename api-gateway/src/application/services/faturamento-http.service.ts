import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ProxyService } from '../../infrastructure/http/proxy.service';

@Injectable()
export class FaturamentoHttpService {
  private readonly baseUrl: string;

  constructor(
    private readonly proxyService: ProxyService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl = this.configService.get<string>('FATURAMENTO_BASE_URL') || 'http://localhost:3001';
  }

  async createCobranca(data: any) {
    return this.proxyService.forwardRequest('POST', `${this.baseUrl}/cobrancas`, data);
  }
}