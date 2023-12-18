import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FinancesController } from './finances/finances.controller';
import { FinancesService } from './finances/finances.service';
import { Transaction, TransactionSchema } from './transaction/transaction';
import { AuthModule  } from '../auth/auth.module'
import { JwtAuthGuard  } from '../auth/jwt-auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }]),
    AuthModule,
    JwtModule.register({ 
      secret: '2vifmNmhyY2ASDA12YRjSKUAQtvOB8Oaw', //clave secreta
      signOptions: { expiresIn: '1h' }, })
  ],
  controllers: [FinancesController],
  providers: [FinancesService, JwtAuthGuard],
})
export class FinancesModule {}
