import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { ICobrancaRepository } from '../../domain/interfaces/cobranca.repository.interface';
import { CreateCobrancaDto, UpdateCobrancaDto } from '../dtos/cobranca.dto';
import { Cobranca } from '../../domain/entities/cobranca.entity';
import { GestaoMessagingService } from '../../infrastructure/messaging/gestao.messaging.service';

@Injectable()
export class CobrancaService {
  constructor(
    @Inject('ICobrancaRepository') private readonly cobrancaRepository: ICobrancaRepository,
    private readonly gestaoMessagingService: GestaoMessagingService,
  ) {}

  async createCobranca(dto: CreateCobrancaDto): Promise<Cobranca> {
    const cobranca = {
      cobrancaId: dto.cobrancaId,
      clienteId: dto.clienteId,
      valor: dto.valor,
      status: dto.status,
      dataVencimento: new Date(dto.dataVencimento),
    };
    const savedCobranca = await this.cobrancaRepository.create(cobranca);
    await this.gestaoMessagingService.notifyCobrancaCreated(dto);
    return savedCobranca;
  }

  async findCobrancaById(cobrancaId: number): Promise<Cobranca> {
    const cobranca = await this.cobrancaRepository.findById(cobrancaId);
    if (!cobranca) {
      throw new NotFoundException(`Cobrança com ID ${cobrancaId} não encontrada`);
    }
    return cobranca;
  }

  async findCobrancasByClienteId(clienteId: number): Promise<Cobranca[]> {
    return this.cobrancaRepository.findByClienteId(clienteId);
  }

  async updateCobranca(cobrancaId: number, dto: UpdateCobrancaDto): Promise<Cobranca> {
    const cobranca = await this.cobrancaRepository.update(cobrancaId, {
      valor: dto.valor,
      status: dto.status,
      dataVencimento: dto.dataVencimento ? new Date(dto.dataVencimento) : undefined,
    });
    if (!cobranca) {
      throw new NotFoundException(`Cobrança com ID ${cobrancaId} não encontrada`);
    }
    return cobranca;
  }

  async deleteCobranca(cobrancaId: number): Promise<void> {
    const cobranca = await this.cobrancaRepository.findById(cobrancaId);
    if (!cobranca) {
      throw new NotFoundException(`Cobrança com ID ${cobrancaId} não encontrada`);
    }
    await this.cobrancaRepository.delete(cobrancaId);
  }
}