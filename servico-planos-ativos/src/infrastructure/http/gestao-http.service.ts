import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

interface PlanoResponse {
  id: number;
  nome: string;
  valor: number;
}

@Injectable()
export class GestaoHttpService {
  private readonly gestaoBaseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.gestaoBaseUrl = this.configService.get<string>('GESTAO_BASE_URL') || 'http://localhost:3000';
  }

  async getPlanoById(planoId: number): Promise<PlanoResponse> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.gestaoBaseUrl}/planos/${planoId}`),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        `Plano com ID ${planoId} não encontrado no serviço de gestão`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}