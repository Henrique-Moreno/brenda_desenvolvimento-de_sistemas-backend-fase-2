import { Injectable, Inject } from '@nestjs/common';
import { PLANO_REPOSITORY, IPlanoRepository } from '../../dominio/plano.repository.interface';
import { Plano } from '../../dominio/plano.entity';

@Injectable()
export class PlanoService {
  constructor(@Inject(PLANO_REPOSITORY) private readonly repository: IPlanoRepository) {}

  async criarPlano(plano: Plano): Promise<void> {
    await this.repository.save(plano);
  }

  async buscarPlano(id: number): Promise<Plano | null> {
    return await this.repository.findById(id);
  }

  async deletarPlano(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}