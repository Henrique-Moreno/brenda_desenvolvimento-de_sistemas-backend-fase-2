import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ProxyService } from '../../infrastructure/http/proxy.service';

@Injectable()
export class GestaoHttpService {
  private readonly baseUrl: string;

  constructor(
    private readonly proxyService: ProxyService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl = this.configService.get<string>('GESTAO_BASE_URL') || 'http://localhost:3000';
  }

  async createPlano(data: any) {
    return this.proxyService.forwardRequest('POST', `${this.baseUrl}/planos`, data);
  }

  async getPlanoById(id: number) {
    return this.proxyService.forwardRequest('GET', `${this.baseUrl}/planos/${id}`);
  }

  async deletePlano(id: number) {
    return this.proxyService.forwardRequest('DELETE', `${this.baseUrl}/planos/${id}`);
  }
}