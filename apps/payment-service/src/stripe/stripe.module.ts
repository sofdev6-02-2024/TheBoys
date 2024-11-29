import { DynamicModule, Module, Provider } from '@nestjs/common';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';
import Stripe from 'stripe';

@Module({
  controllers: [StripeController],
  providers: [StripeService],
})
export class StripeModule {
  static forRoot(
    apiKey: string,
    config: Stripe.StripeConfig,
    global?: boolean,
  ): DynamicModule {
    const stripe = new Stripe(apiKey, config);

    const stripeProvider: Provider = {
      provide: 'STRIPE_CLIENT',
      useValue: stripe,
    };

    return {
      module: StripeModule,
      providers: [stripeProvider],
      exports: [stripeProvider],
      global: global ? global : true,
    };
  }
}
