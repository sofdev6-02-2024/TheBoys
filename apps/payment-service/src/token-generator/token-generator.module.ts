import { Module } from '@nestjs/common';
import { TokenGeneratorController } from './token-generator.controller';
import { TokenGeneratorService } from './token-generator.service';
import { StripeService } from 'src/stripe/stripe.service';

@Module({
  controllers: [TokenGeneratorController],
  providers: [TokenGeneratorService, StripeService],
})
export class TokenGeneratorModule {}
