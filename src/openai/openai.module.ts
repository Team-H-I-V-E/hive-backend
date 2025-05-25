import { Module } from '@nestjs/common';
import { ChatbotService } from './openai.service';
import { ChatbotController } from './openai.controller';


@Module({
  controllers: [ChatbotController],
  providers: [ChatbotService],
})
export class ChatbotModule {}
