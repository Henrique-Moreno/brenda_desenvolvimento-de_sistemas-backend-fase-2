import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { PlanoAtivo, PlanoAtivoSchema } from '../../domain/entities/plano-ativo.entity';
import { PlanoAtivoRepository } from '../../infrastructure/repositories/plano-ativo.repository';
import { PlanoAtivoService } from '../../application/services/plano-ativo.service';
import { PlanoAtivoController } from './plano-ativo.controller';
import { GestaoHttpService } from '../../infrastructure/http/gestao-http.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PlanoAtivo.name, schema: PlanoAtivoSchema }]),
    HttpModule,
  ],
  controllers: [PlanoAtivoController],
  providers: [
    PlanoAtivoService,
    GestaoHttpService,
    {
      provide: 'IPlanoAtivoRepository',
      useClass: PlanoAtivoRepository,
    },
  ],
  exports: [PlanoAtivoService, 'IPlanoAtivoRepository'],
})
export class PlanoAtivoModule {}