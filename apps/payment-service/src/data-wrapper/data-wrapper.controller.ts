import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GenerateJwtDto } from './dto/generate-jwt.dto';
import { DataWrapperService } from './data-wrapper.service';

@Controller()
export class DataWrapperController {
  constructor(private readonly dataWrapperService: DataWrapperService) {}

  @MessagePattern('generateToken')
  wrapPayment(@Payload() generateJwtDto: GenerateJwtDto) {
    return this.dataWrapperService.wrapPaymentObject(generateJwtDto);
  }
}
