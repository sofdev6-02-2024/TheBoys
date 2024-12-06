import { Controller, Post, Body } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { Unprotected } from 'nest-keycloak-connect';

@Controller('api/ai-service')
export class AIServiceProxyController {
  @Client({
    transport: Transport.TCP,
    options: {
      host: 'ai-service',
      port: 3003,
    },
  })
  client: ClientProxy;

  @Post('chat')
  @Unprotected()
  async handleChat(@Body() body: any) {
    console.log('Received body:', body); 
    try {
      console.log('Sending message to AI service');
      const result = await this.client.send({ cmd: 'AI' }, body).toPromise();
      console.log('Received result:', result); 
      return result;
    } catch (error) {
      console.error('Error in proxy controller:', error);
      throw error;
    }
  }
}
