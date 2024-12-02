import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GenerateJwtDto } from './dto/generate-jwt.dto';
import { TokenGeneratorService } from './token-generator.service';

@Controller()
export class TokenGeneratorController {
  constructor(private readonly tokenGeneratorService: TokenGeneratorService) {}

  @MessagePattern('generate')
  generateToken(@Payload() generateJwtDto: GenerateJwtDto) {
    return this.tokenGeneratorService.generateToken(generateJwtDto);
  }
}
