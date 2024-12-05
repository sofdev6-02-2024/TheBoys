import { Controller, Post, Body } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';

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
  async handleChat(@Body() body: any) {
    console.log('Received body:', body); // Log de entrada
    try {
      console.log('Sending message to AI service'); // Log antes de enviar
      const result = await this.client.send({ cmd: 'AI' }, body).toPromise();
      console.log('Received result:', result); // Log de respuesta
      return result;
    } catch (error) {
      console.error('Error in proxy controller:', error);
      throw error;
    }
  }
}
