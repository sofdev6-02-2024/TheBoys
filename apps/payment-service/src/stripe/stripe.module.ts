import { DynamicModule, Module, Provider } from '@nestjs/common';
import Stripe from 'stripe';

@Module({})
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
