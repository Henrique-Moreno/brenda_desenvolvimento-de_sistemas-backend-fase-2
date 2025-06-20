import { Cobranca } from '../entities/cobranca.entity';

export interface ICobrancaRepository {
  create(cobranca: Cobranca): Promise<Cobranca>;
  findById(id: number): Promise<Cobranca | null>;
  findByClienteId(clienteId: number): Promise<Cobranca[]>;
  update(id: number, cobranca: Partial<Cobranca>): Promise<Cobranca | null>;
  delete(id: number): Promise<void>;
}