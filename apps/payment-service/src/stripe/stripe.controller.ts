import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { StripeService } from './stripe.service';
import { CreateIntentDto } from './dto/create-intent.dto';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @MessagePattern('createIntent')
  async createIntent(@Payload() createIntentDto: CreateIntentDto) {
    return this.stripeService.createIntent(createIntentDto);
  }
}
