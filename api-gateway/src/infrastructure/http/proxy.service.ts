import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProxyService {
  constructor(private readonly httpService: HttpService) {}

  async forwardRequest(method: string, url: string, data?: any, headers?: any): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.request({
          method,
          url,
          data,
          headers,
        }),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data?.message || 'Erro ao encaminhar requisição',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}