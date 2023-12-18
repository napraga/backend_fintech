import { Controller, Get, Post, Body, Request, Query, UseGuards   } from '@nestjs/common';
import { Transaction } from '../transaction/transaction';
import { FinancesService } from './finances.service';
import { JwtAuthGuard  } from '../../auth/jwt-auth.guard'; 
import { Logger } from '@nestjs/common';

@Controller('finances')
@UseGuards(JwtAuthGuard)
export class FinancesController {
  constructor(private financesService: FinancesService) {}

  @Get('transactions')
  async getAllTransactions(@Request() req: any): Promise<Transaction[]> {
    const userId = req.user.sub;
    return this.financesService.getAllTransactions(userId);
  }

  @Post('add-transaction')
  async addTransaction(@Body() body: any, @Request() req: any) {
    const userId = req.user.sub;
    const { description, amount, type, date } = body;
    return this.financesService.addTransaction(userId, description, amount, type, date);
  }


    @Post('/transactionsbydate')
    async getAllTransactionsInDateRange(
        @Body() body: any,
        @Request() req: any
      ) {
        const {fechaInicio, fechaFinal} = body
        const parsedFechaInicio = fechaInicio ? new Date(fechaInicio) : null;
        const parsedFechaFinal = fechaFinal ? new Date(fechaFinal) : null;
    
        if (parsedFechaInicio && isNaN(parsedFechaInicio.getTime())) {
          return false;
        }
    
        if (parsedFechaFinal && isNaN(parsedFechaFinal.getTime())) {
          return false;
        }
        const userId = req.user.sub;
        const transactions = await this.financesService.getAllTransactionsInDateRange(
          parsedFechaInicio,
          parsedFechaFinal,
          userId
        );
    
        return transactions;
      }
}