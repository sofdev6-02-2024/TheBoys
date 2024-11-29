import { Module } from '@nestjs/common';
import { StripeModule } from './stripe/stripe.module';
import { DataWrapperModule } from './data-wrapper/data-wrapper.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    StripeModule.forRoot(process.env.SECRET_KEY_STRIPE || 'secret_key', {
      apiVersion: '2024-11-20.acacia',
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        signOptions: {
          expiresIn: '1h',
        },
        secret: configService.get<string>('jwt.secret'),
      }),
      global: true,
    }),
    DataWrapperModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
