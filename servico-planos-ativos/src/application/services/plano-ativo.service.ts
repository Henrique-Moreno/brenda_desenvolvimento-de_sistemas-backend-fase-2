import { Injectable, Inject, Logger } from '@nestjs/common';
import { IPlanoAtivoRepository } from '../../domain/interfaces/plano-ativo.repository.interface';
import { CreatePlanoAtivoDto } from '../dtos/plano-ativo.dto';
import { PlanoAtivo } from '../../domain/entities/plano-ativo.entity';
import { GestaoHttpService } from '../../infrastructure/http/gestao-http.service';

@Injectable()
export class PlanoAtivoService {
  private readonly logger = new Logger(PlanoAtivoService.name);

  constructor(
    @Inject('IPlanoAtivoRepository') private readonly planoAtivoRepository: IPlanoAtivoRepository,
    private readonly gestaoHttpService: GestaoHttpService,
  ) {}

  async createPlanoAtivo(dto: CreatePlanoAtivoDto): Promise<PlanoAtivo> {
    this.logger.log(`Criando plano ativo para planoId: ${dto.planoId}`);
    const plano = await this.gestaoHttpService.getPlanoById(dto.planoId);
    this.logger.log(`Plano retornado do servico-gestao: ${JSON.stringify(plano)}`);

    if (!plano || !plano.nome || plano.valor == null) {
      this.logger.error(`Plano inválido retornado para planoId: ${dto.planoId}`);
      throw new Error('Plano inválido: nome ou valor não fornecidos pelo servico-gestao');
    }

    const planoAtivo = {
      clienteId: dto.clienteId,
      planoId: dto.planoId,
      nomePlano: plano.nome,
      valor: plano.valor,
      dataAtivacao: new Date(dto.dataAtivacao),
      ativo: dto.ativo,
    };

    this.logger.log(`Salvando plano ativo: ${JSON.stringify(planoAtivo)}`);
    return this.planoAtivoRepository.create(planoAtivo);
  }

  async findPlanosAtivosByClienteId(clienteId: number): Promise<PlanoAtivo[]> {
    return this.planoAtivoRepository.findByClienteId(clienteId);
  }
}