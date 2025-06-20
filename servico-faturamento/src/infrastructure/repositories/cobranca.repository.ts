import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cobranca } from '../../domain/entities/cobranca.entity';
import { ICobrancaRepository } from '../../domain/interfaces/cobranca.repository.interface';

@Injectable()
export class CobrancaRepository implements ICobrancaRepository {
  constructor(@InjectModel(Cobranca.name) private cobrancaModel: Model<Cobranca>) { }

  async create(cobranca: Cobranca): Promise<Cobranca> {
    const createdCobranca = new this.cobrancaModel(cobranca);
    return createdCobranca.save();
  }

  async findById(cobrancaId: number): Promise<Cobranca | null> {
    return this.cobrancaModel.findOne({ cobrancaId }).exec();
  }

  async findByClienteId(clienteId: number): Promise<Cobranca[]> {
    return this.cobrancaModel.find({ clienteId }).exec();
  }

  async update(cobrancaId: number, cobranca: Partial<Cobranca>): Promise<Cobranca | null> {
    return this.cobrancaModel.findOneAndUpdate({ cobrancaId }, cobranca, { new: true }).exec();
  }

  async delete(cobrancaId: number): Promise<void> {
    await this.cobrancaModel.deleteOne({ cobrancaId }).exec();
  }
}