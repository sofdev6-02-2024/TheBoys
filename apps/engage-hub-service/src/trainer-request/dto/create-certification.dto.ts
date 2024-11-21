import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateCertificationDto {
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
