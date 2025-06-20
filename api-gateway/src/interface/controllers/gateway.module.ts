import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GatewayController } from './gateway.controller';
import { GestaoHttpService } from '../../application/services/gestao-http.service';
import { FaturamentoHttpService } from '../../application/services/faturamento-http.service';
import { PlanosAtivosHttpService } from '../../application/services/planos-ativos-http.service';
import { ProxyService } from '../../infrastructure/http/proxy.service';

@Module({
  imports: [HttpModule],
  controllers: [GatewayController],
  providers: [
    GestaoHttpService,
    FaturamentoHttpService,
    PlanosAtivosHttpService,
    ProxyService,
  ],
})
export class GatewayModule {}