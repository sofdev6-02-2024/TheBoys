import { Body, Controller, Post } from '@nestjs/common';
import { AIServiceService } from './ai-service.service';
import { ChatRequestDTO } from './ai-service.dto';

@Controller('ai-service')
export class AIServiceController {
  constructor(private readonly aiServiceService: AIServiceService) {}

  @Post('chat')
  async handleChat(@Body() chatRequest: ChatRequestDTO) {
    const response = await this.aiServiceService.generateChatResponse(
      chatRequest.message,
    );
    return { response };
  }
}
