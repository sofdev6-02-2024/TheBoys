import { Module } from '@nestjs/common';
import { AIServiceController } from './ai-service.controller';
import { AIServiceService } from './ai-service.service';

@Module({
  controllers: [AIServiceController],
  providers: [AIServiceService],
  exports: [AIServiceService],
})
export class AIServiceModule {}
