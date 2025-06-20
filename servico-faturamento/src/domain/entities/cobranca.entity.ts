import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CobrancaDocument = Cobranca & Document;

@Schema({ timestamps: true })
export class Cobranca {
  @Prop({ required: true, unique: true })
  cobrancaId: number;

  @Prop({ required: true })
  clienteId: number;

  @Prop({ required: true })
  valor: number;

  @Prop({ required: true, enum: ['pendente', 'pago', 'cancelado'] })
  status: string;

  @Prop({ required: true })
  dataVencimento: Date;
}

export const CobrancaSchema = SchemaFactory.createForClass(Cobranca);