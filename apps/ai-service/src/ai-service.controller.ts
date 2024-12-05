import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AIServiceService } from './ai-service.service';

@Controller()
export class AIServiceController {
  constructor(private readonly aiServiceService: AIServiceService) {}

  @MessagePattern({ cmd: 'AI' })
  async handleChat(data: { message: string }) {
    const response = await this.aiServiceService.generateChatResponse(
      data.message,
    );
    return { response };
  }
}
