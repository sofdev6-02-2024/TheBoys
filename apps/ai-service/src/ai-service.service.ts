import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AIServiceService {
  private readonly OPENAI_API_KEY = 'aca iria la api key';

  async generateChatResponse(message: string): Promise<string> {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: message }],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.OPENAI_API_KEY}`,
          },
        },
      );

      const reply = response.data.choices[0].message.content;
      return reply;
    } catch (error) {
      console.error('Error with OpenAI API:', error);
      throw new Error('Error connecting to AI.');
    }
  }
}
