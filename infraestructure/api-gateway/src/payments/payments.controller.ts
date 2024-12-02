import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Unprotected } from 'nest-keycloak-connect';

@Controller('payments')
export class PaymentsController {
  constructor(
    @Inject('PAYMENT_SERVICE') private readonly paymentService: ClientProxy,
  ) {}

  @Post('generate')
  @Unprotected()
  wrapData(@Body() generateDataDto: any) {
    return this.paymentService.send('generate', generateDataDto);
  }
}
