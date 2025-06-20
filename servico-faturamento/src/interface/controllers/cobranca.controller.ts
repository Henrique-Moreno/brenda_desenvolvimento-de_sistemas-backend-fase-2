import { Controller, Post, Get, Patch, Delete, Body, Param, ParseIntPipe, HttpCode } from '@nestjs/common';
import { CobrancaService } from '../../application/services/cobranca.service';
import { CreateCobrancaDto, UpdateCobrancaDto } from '../../application/dtos/cobranca.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { Cobranca } from '../../domain/entities/cobranca.entity';

@ApiTags('cobrancas')
@Controller('cobrancas')
export class CobrancaController {
  constructor(private readonly cobrancaService: CobrancaService) { }

  @Post()
  @ApiOperation({ summary: 'Criar uma nova cobrança' })
  @ApiBody({ type: CreateCobrancaDto })
  @ApiResponse({ status: 201, description: 'Cobrança criada com sucesso', type: Cobranca })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async create(@Body() dto: CreateCobrancaDto): Promise<Cobranca> {
    return this.cobrancaService.createCobranca(dto);
  }

  @Get(':cobrancaId')
  @ApiOperation({ summary: 'Consultar cobrança por ID' })
  @ApiParam({ name: 'cobrancaId', description: 'ID da cobrança', example: 1 })
  @ApiResponse({ status: 200, description: 'Cobrança encontrada', type: Cobranca })
  @ApiResponse({ status: 404, description: 'Cobrança não encontrada' })
  async findById(@Param('cobrancaId', ParseIntPipe) cobrancaId: number): Promise<Cobranca> {
    return this.cobrancaService.findCobrancaById(cobrancaId);
  }

  @Get('cliente/:clienteId')
  @ApiOperation({ summary: 'Consultar cobranças por ID do cliente' })
  @ApiParam({ name: 'clienteId', description: 'ID do cliente', example: 100 })
  @ApiResponse({ status: 200, description: 'Lista de cobranças', type: [Cobranca] })
  async findByClienteId(@Param('clienteId', ParseIntPipe) clienteId: number): Promise<Cobranca[]> {
    return this.cobrancaService.findCobrancasByClienteId(clienteId);
  }

  @Patch(':cobrancaId')
  @ApiOperation({ summary: 'Atualizar uma cobrança' })
  @ApiParam({ name: 'cobrancaId', description: 'ID da cobrança', example: 1 })
  @ApiBody({ type: UpdateCobrancaDto })
  @ApiResponse({ status: 200, description: 'Cobrança atualizada', type: Cobranca })
  @ApiResponse({ status: 404, description: 'Cobrança não encontrada' })
  async update(
    @Param('cobrancaId', ParseIntPipe) cobrancaId: number,
    @Body() dto: UpdateCobrancaDto,
  ): Promise<Cobranca> {
    return this.cobrancaService.updateCobranca(cobrancaId, dto);
  }

  @Delete(':cobrancaId')
  @HttpCode(204)
  @ApiOperation({ summary: 'Deletar uma cobrança' })
  @ApiParam({ name: 'cobrancaId', description: 'ID da cobrança', example: 1 })
  @ApiResponse({ status: 204, description: 'Cobrança deletada' })
  @ApiResponse({ status: 404, description: 'Cobrança não encontrada' })
  async delete(@Param('cobrancaId', ParseIntPipe) cobrancaId: number): Promise<void> {
    return this.cobrancaService.deleteCobranca(cobrancaId);
  }
}