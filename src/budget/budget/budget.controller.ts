// budget.controller.ts
import { Controller, Post, Delete, Get, Param, Body, UseGuards, Req, Request } from '@nestjs/common';
import { JwtAuthGuard  } from '../../auth/jwt-auth.guard';
import { Budget } from '../budget.model';
import { BudgetService } from './budget.service';

// interface AuthenticatedRequest extends Request {
//   user: {
//     sub: string; // Ajusta según la estructura de tu token JWT
//   };
// }

@Controller('budgets')
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async addBudget(@Body() body: any, @Request() req: any): Promise<Budget> {
    const { fechaInicial, fechaFinal, amount, nombre } = body;
    const userId = req.user.sub;
    return this.budgetService.addBudget(fechaInicial, fechaFinal, amount, nombre, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteBudget(@Param('id') budgetId: string, @Request() req: any): Promise<Budget | null> {
    const userId = req.user.sub;
    return this.budgetService.deleteBudget(budgetId, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllBudgets(@Request() req: any): Promise<Budget[]> {
    const userId = req.user.sub;
    return this.budgetService.getAllBudgets(userId);
  }
}
