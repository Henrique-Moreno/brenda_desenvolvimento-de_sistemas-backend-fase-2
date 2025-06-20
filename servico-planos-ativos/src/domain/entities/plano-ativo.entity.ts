import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlanoAtivoDocument = PlanoAtivo & Document;

@Schema({ timestamps: true })
export class PlanoAtivo {
  @Prop({ required: true })
  clienteId: number;

  @Prop({ required: true })
  planoId: number;

  @Prop({ required: true })
  nomePlano: string;

  @Prop({ required: true })
  valor: number;

  @Prop({ required: true })
  dataAtivacao: Date;

  @Prop({ required: true, default: true })
  ativo: boolean;
}

export const PlanoAtivoSchema = SchemaFactory.createForClass(PlanoAtivo);
