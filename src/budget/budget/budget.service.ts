import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Budget } from '../budget.model';

@Injectable()
export class BudgetService {
    constructor(@InjectModel(Budget.name) private budgetModel: Model<Budget>) {}

    async addBudget(fechaInicial: Date, fechaFinal: Date, amount: number, nombre: string, userId: string): Promise<Budget> {
      const newBudget = new this.budgetModel({ fechaInicial, fechaFinal, amount, nombre, userId });
      return newBudget.save();
    }
  
    async deleteBudget(budgetId: string, userId: string): Promise<Budget | null> {
      // Asegúrate de que estás filtrando por ID de usuario al eliminar
      return this.budgetModel.findOneAndDelete({ _id: budgetId, userId }).exec();
    }
  
    async getAllBudgets(userId: string): Promise<Budget[]> {
      return this.budgetModel.find({ userId }).exec();
    }
}
