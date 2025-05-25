import { Controller, Post, Body } from '@nestjs/common';
import { ChatbotService } from './openai.service';

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post('ask') 
  async askChatbot(@Body('prompt') prompt: string): Promise<{ response: string }> {
    const response = await this.chatbotService.getChatResponse(prompt);
    return { response };
  }
}
