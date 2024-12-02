import { Inject, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import Stripe from 'stripe';
import { CreateIntentDto } from './dto/create-intent.dto';

@Injectable()
export class StripeService {
  constructor(@Inject('STRIPE_CLIENT') private readonly stripe: Stripe) {}

  async createIntent(createIntentDto: CreateIntentDto) {
    const { amount, currency } = createIntentDto;
    const intent = await this.stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ['card'],
    });

    if (!intent) throw new RpcException('Error while creating intent');

    return intent.client_secret;
  }
}
