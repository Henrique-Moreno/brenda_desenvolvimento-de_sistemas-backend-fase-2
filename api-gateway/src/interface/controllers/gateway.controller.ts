import { Controller, Post, Get, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { GestaoHttpService } from '../../application/services/gestao-http.service';
import { FaturamentoHttpService } from '../../application/services/faturamento-http.service';
import { PlanosAtivosHttpService } from '../../application/services/planos-ativos-http.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('gateway')
@Controller()
export class GatewayController {
  constructor(
    private readonly gestaoHttpService: GestaoHttpService,
    private readonly faturamentoHttpService: FaturamentoHttpService,
    private readonly planosAtivosHttpService: PlanosAtivosHttpService,
  ) {}

  @Post('planos')
  @ApiOperation({ summary: 'Criar um plano' })
  @ApiResponse({ status: 201, description: 'Plano criado' })
  async createPlano(@Body() data: any) {
    return this.gestaoHttpService.createPlano(data);
  }

  @Get('planos/:id')
  @ApiOperation({ summary: 'Obter plano por ID' })
  @ApiResponse({ status: 200, description: 'Plano retornado' })
  async getPlanoById(@Param('id', ParseIntPipe) id: number) {
    return this.gestaoHttpService.getPlanoById(id);
  }

  @Delete('planos/:id')
  @ApiOperation({ summary: 'Excluir plano por ID' })
  @ApiResponse({ status: 200, description: 'Plano excluído' })
  async deletePlano(@Param('id', ParseIntPipe) id: number) {
    return this.gestaoHttpService.deletePlano(id);
  }

  @Post('cobrancas')
  @ApiOperation({ summary: 'Criar uma cobrança' })
  @ApiResponse({ status: 201, description: 'Cobrança criada' })
  async createCobranca(@Body() data: any) {
    return this.faturamentoHttpService.createCobranca(data);
  }

  @Post('planos-ativos')
  @ApiOperation({ summary: 'Criar um plano ativo' })
  @ApiResponse({ status: 201, description: 'Plano ativo criado' })
  async createPlanoAtivo(@Body() data: any) {
    return this.planosAtivosHttpService.createPlanoAtivo(data);
  }

  @Get('planos-ativos/cliente/:clienteId')
  @ApiOperation({ summary: 'Obter planos ativos por cliente ID' })
  @ApiResponse({ status: 200, description: 'Planos ativos retornados' })
  async getPlanosAtivosByClienteId(@Param('clienteId', ParseIntPipe) clienteId: number) {
    return this.planosAtivosHttpService.getPlanosAtivosByClienteId(clienteId);
  }
}