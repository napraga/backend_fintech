import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Budget, BudgetSchema } from './budget.model';
import { BudgetService } from './budget/budget.service';
import { BudgetController } from './budget/budget.controller';
import { AuthModule  } from '../auth/auth.module'
import { JwtAuthGuard  } from '../auth/jwt-auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
    MongooseModule.forFeature([{ name: Budget.name, schema: BudgetSchema }]),
    AuthModule,
    JwtModule.register({ 
        secret: '2vifmNmhyY2ASDA12YRjSKUAQtvOB8Oaw', //clave secreta
        signOptions: { expiresIn: '1h' }, })
    ],
    providers: [BudgetService],
    controllers: [BudgetController],
})
export class BudgetModule {}