import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Budget extends Document {
  @Prop({ required: true })
  fechaInicial: Date;

  @Prop({ required: true })
  fechaFinal: Date;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  nombre: string;

  @Prop()
  userId: string;
}

export const BudgetSchema = SchemaFactory.createForClass(Budget);