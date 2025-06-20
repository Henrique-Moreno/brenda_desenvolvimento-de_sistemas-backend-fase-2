import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ProxyService } from '../../infrastructure/http/proxy.service';

@Injectable()
export class PlanosAtivosHttpService {
  private readonly baseUrl: string;

  constructor(
    private readonly proxyService: ProxyService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl = this.configService.get<string>('PLANOS_ATIVOS_BASE_URL') || 'http://localhost:3002';
  }

  async createPlanoAtivo(data: any) {
    return this.proxyService.forwardRequest('POST', `${this.baseUrl}/planos-ativos`, data);
  }

  async getPlanosAtivosByClienteId(clienteId: number) {
    return this.proxyService.forwardRequest('GET', `${this.baseUrl}/planos-ativos/cliente/${clienteId}`);
  }
}