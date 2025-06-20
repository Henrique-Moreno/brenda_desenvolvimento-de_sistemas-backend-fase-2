import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPlanoAtivoRepository } from '../../domain/interfaces/plano-ativo.repository.interface';
import { PlanoAtivo, PlanoAtivoDocument } from '../../domain/entities/plano-ativo.entity';

@Injectable()
export class PlanoAtivoRepository implements IPlanoAtivoRepository {
  constructor(@InjectModel(PlanoAtivo.name) private planoAtivoModel: Model<PlanoAtivoDocument>) {}

  async create(planoAtivo: PlanoAtivo): Promise<PlanoAtivo> {
    const createdPlanoAtivo = new this.planoAtivoModel(planoAtivo);
    return createdPlanoAtivo.save();
  }

  async findByClienteId(clienteId: number): Promise<PlanoAtivo[]> {
    return this.planoAtivoModel.find({ clienteId, ativo: true }).exec();
  }
}