import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GenerateJwtDto } from './dto/generate-jwt.dto';
import { StripeService } from 'src/stripe/stripe.service';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class TokenGeneratorService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly stripeService: StripeService,
  ) {}

  async generateToken(generateJwtDto: GenerateJwtDto) {
    const { name, description, image_url, amount, currency } = generateJwtDto;

    const client_secret = await this.stripeService.createIntent({
      amount,
      currency,
    });

    if (!client_secret) throw new RpcException('Error while creating intent');

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
