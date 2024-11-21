import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MailerService } from './mailer.service';
import { SendEmailDto } from './dto/send-emal.dto';

@Controller('mailes')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @MessagePattern('sendEmail')
  async sendEmail(@Payload() payload: SendEmailDto) {
    const { toEmail, subject, body, comments, signature } = payload;

    const finalBody = `
      <h2>Status: ${subject}</h2>
      <p>Comments: ${comments}</p>
      <p>Signature: ${signature}</p>
    `;

    const imageUrl = '/resources/body-bost.jpg';
    await this.mailerService.sendEmail(toEmail, subject, finalBody, imageUrl);

    return { message: 'Correo enviado correctamente!' };
  }
}
