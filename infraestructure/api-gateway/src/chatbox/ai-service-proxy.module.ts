import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AIServiceProxyController } from './ai-service-proxy.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AI_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'ai-service',
          port: 3003,
        },
      },
    ]),
  ],
  controllers: [AIServiceProxyController],
})
export class AIServiceProxyModule {}
