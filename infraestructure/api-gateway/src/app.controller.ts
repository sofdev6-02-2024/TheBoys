import { Controller, Get, Inject, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

@Controller('gateway')
export class AppController {
  constructor(
    @Inject('ENGAGE_HUB_SERVICE')
    private readonly engageHubService: ClientProxy,
    @Inject('TRAINING_SERVICE') private readonly trainingService: ClientProxy,
    @Inject('AI_SERVICE') private readonly aiService: ClientProxy,
    @Inject('PAYMENT_SERVICE') private readonly paymentService: ClientProxy,
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
  ) {}

  @Get('Engage')
  getSomething(): Observable<any> {
    return this.engageHubService.send({ cmd: 'Engaging' }, {});
  }

  @Get('Training')
  getTraining(): Observable<any> {
    return this.trainingService.send({ cmd: 'Training' }, {});
  }

  @Get('AI')
  getAI(): Observable<any> {
    return this.aiService.send({ cmd: 'AI' }, {});
  }

  @Get('Payment')
  getPayment(): Observable<any> {
    return this.paymentService.send({ cmd: 'Payment' }, {});
  }

  @Get('Auth')
  getAuth(): Observable<any> {
    return this.authService.send({ cmd: 'Auth' }, {});
  }

}
