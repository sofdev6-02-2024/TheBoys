import { Module } from '@nestjs/common';
import { StripeModule } from './stripe/stripe.module';

@Module({
  imports: [
    StripeModule.forRoot(
      'sk_test_51QPq60FYtJtMV7wep3zXeHsGOc3axi0xJtkFp8taDBAgtrBoH9eEhwat7UCmpRWivP0XaFC0mABuYVfIN43K6ZkR00tp3tg3EC',
      { apiVersion: '2024-11-20.acacia' },
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
