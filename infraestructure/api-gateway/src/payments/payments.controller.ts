import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Unprotected } from 'nest-keycloak-connect';

@Controller('payments')
export class PaymentsController {
  constructor(
    @Inject('PAYMENT_SERVICE') private readonly paymentService: ClientProxy,
  ) {}

  @Post()
  @Unprotected()
  createIntent(@Body() createIntentDto: any) {
    return this.paymentService.send('createIntent', createIntentDto);
  }
}
