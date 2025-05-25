import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import OpenAI from 'openai'; // 최신 OpenAI 라이브러리 import
import { openAIConfig } from '../configs/openai.config';

@Injectable()
export class ChatbotService {
  private chatHistory: { role: 'user' | 'assistant' | 'system'; content: string }[] = [];
  private openai: OpenAI;
  private readonly assistantId: string = process.env.OPENAI_ASSISTANT_ID!;
  private readonly maxTokens: number = 1000; // 응답 최대 토큰 수

  constructor() {
    this.openai = new OpenAI({
      apiKey: openAIConfig.apiKey,
    });
  }

  /**
   * 사용자 입력을 기반으로 OpenAI API 호출
   * @param prompt 사용자 입력
   * @returns OpenAI 응답
   */
  async getChatResponse(prompt: string): Promise<string> {
    try {
      const systemMessage: { role: 'system'; content: string } = {
        role: 'system',
        content: `You are an assistant with ID: ${this.assistantId}. Respond within ${this.maxTokens} tokens and adjust the response to fit the limit without cutting off sentences.`,
      };

      const updatedChatHistory: { role: 'user' | 'assistant' | 'system'; content: string }[] = [
        systemMessage,
        ...this.chatHistory.slice(-10),
        { role: 'user', content: prompt },
      ];

      // OpenAI API 호출
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: updatedChatHistory,
        max_tokens: this.maxTokens,
        temperature: 0.5,
      });

      // 응답 메시지 가져오기
      const assistantResponse =
      completion.choices?.[0]?.message?.content?.trim() ?? '응답 없음';
    
      // 최대 길이를 초과하지 않도록 마지막 문장을 다듬기
      const adjustedResponse = this.adjustResponseToMaxTokens(assistantResponse, this.maxTokens);

      this.chatHistory = [
        ...updatedChatHistory,
        { role: 'assistant', content: adjustedResponse },
      ];

      return adjustedResponse;
    } catch (error) {
      console.error(
        'Error calling OpenAI API:',
        error.response?.data || error.message,
      );
      throw new HttpException(
        'OpenAI API 호출 중 오류가 발생했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * 응답이 최대 토큰 수를 초과하지 않도록 조정
   * @param response 원래 OpenAI 응답
   * @param maxTokens 최대 토큰 수
   * @returns 조정된 응답
   */
  private adjustResponseToMaxTokens(response: string, maxTokens: number): string {
    const sentences = response.split(/(?<=[.!?])\s+/); // 문장 단위로 나누기
    let adjustedResponse = '';
    let currentTokenCount = 0;
  
    for (const sentence of sentences) {
      const tokenLength = this.estimateTokenCount(sentence);
      if (currentTokenCount + tokenLength > maxTokens) {
        break;
      }
      adjustedResponse += sentence + ' ';
      currentTokenCount += tokenLength;
    }
  
    // 잘린 문장이 없으면 기본 메시지 반환
    return adjustedResponse.trim() || '응답 생성에 실패했습니다.';
  }
  
  

  /**
   * 토큰 수 추정 (대략적인 계산)
   * @param text 문자열
   * @returns 예상 토큰 수
   */
  private estimateTokenCount(text: string): number {
    return Math.ceil(text.length / 4); // 평균적으로 한 토큰은 약 4개의 문자
  }

  /**
   * 대화 기록 초기화
   */
  clearChatHistory() {
    this.chatHistory = [];
    console.log('Chat history cleared.');
  }
}
