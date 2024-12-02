import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PAYMENT_SERVICE',
        transport: Transport.TCP,
        options: { host: 'payment-service', port: 3004 },
      },
    ]),
  ],
  controllers: [PaymentsController],
})
export class PaymentsModule {}
