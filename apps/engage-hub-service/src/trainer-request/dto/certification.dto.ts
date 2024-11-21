import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CertificationDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  issuedBy: string;

  @IsNotEmpty()
  @IsDate()
  issueDate: Date;
}
