import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GenerateJwtDto } from './dto/generate-jwt.dto';

@Injectable()
export class DataWrapperService {
  constructor(private readonly jwtService: JwtService) {}

  async wrapPaymentObject(generateJwtDto: GenerateJwtDto) {
    const { name, description, image_url, amount, currency, client_secret } =
      generateJwtDto;
    const payload = {
      sub: client_secret,
      name,
      description,
      image_url,
      amount,
      currency,
    };
    const token = await this.jwtService.signAsync(payload, {});
    return token;
  }
}
