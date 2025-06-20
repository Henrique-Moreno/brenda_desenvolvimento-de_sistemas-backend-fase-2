import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { PlanoAtivoService } from '../../application/services/plano-ativo.service';
import { CreatePlanoAtivoDto } from '../../application/dtos/plano-ativo.dto';
import { PlanoAtivo } from '../../domain/entities/plano-ativo.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('planos-ativos')
@Controller('planos-ativos')
export class PlanoAtivoController {
  constructor(private readonly planoAtivoService: PlanoAtivoService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um plano ativo' })
  @ApiResponse({ status: 201, description: 'Plano ativo criado', type: PlanoAtivo })
  async create(@Body() createPlanoAtivoDto: CreatePlanoAtivoDto): Promise<PlanoAtivo> {
    return this.planoAtivoService.createPlanoAtivo(createPlanoAtivoDto);
  }

  @Get('cliente/:clienteId')
  @ApiOperation({ summary: 'Recuperar planos ativos de um cliente' })
  @ApiResponse({ status: 200, description: 'Lista de planos ativos', type: [PlanoAtivo] })
  async findByClienteId(@Param('clienteId', ParseIntPipe) clienteId: number): Promise<PlanoAtivo[]> {
    return this.planoAtivoService.findPlanosAtivosByClienteId(clienteId);
  }
}