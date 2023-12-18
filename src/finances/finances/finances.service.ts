import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from '../transaction/transaction';

@Injectable()
export class FinancesService {
  private transactions: Transaction[] = [];
  constructor(@InjectModel(Transaction.name) private transactionModel: Model<Transaction>) {}

  async getAllTransactions(userId: string): Promise<Transaction[]> {
    return this.transactionModel.find({userId}).exec();
  }

  async addTransaction(userId: string, description: string, amount: number, type: string, date: string): Promise<Transaction> {
    const newTransaction = new this.transactionModel({ userId, description, amount, type, date });
    return newTransaction.save();
  }

  async getAllTransactionsInDateRange(fechaInicio: Date, fechaFinal: Date, userId: string): Promise<any> {
    //obtener todas las transacciones
    const allTransactions = await this.getAllTransactions(userId);

    const transactionsInRange = allTransactions.filter(
        transaction =>
          transaction.date >= fechaInicio &&
          transaction.date <= fechaFinal 
        );

    const totalIngresos = transactionsInRange
        .filter((transaction) => transaction.type === 'Ingreso')
        .reduce((sum, transaction) => sum + transaction.amount, 0);
  
    const totalEgresos = transactionsInRange
        .filter((transaction) => transaction.type === 'Egreso')
        .reduce((sum, transaction) => sum + transaction.amount, 0);
  
        return {
            transactions: transactionsInRange,
            totals: {
              totalIngresos,
              totalEgresos,
            },
          };
  }
}