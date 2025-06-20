import { Module } from '@nestjs/common';
import { PlanoController } from '../interfaces/controllers/plano.controller';
import { PlanoService } from '../aplicacao/services/plano.service';
import { PLANO_REPOSITORY } from '../dominio/plano.repository.interface';
import { PlanoRepositoryMemory } from '../infraestrutura/repositories/plano.repository.memory';
import { PlanoRepositoryMySQL } from '../infraestrutura/repositories/plano.repository.mysql';

@Module({
  controllers: [PlanoController],
  providers: [
    PlanoService,
    {
      provide: PLANO_REPOSITORY,
      useClass: PlanoRepositoryMemory, 
    },
  ],
})
export class PlanoModule {}