import { IsDate, IsOptional, IsString } from 'class-validator';

export class UpdateCertificationDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  issuedBy?: string;

  @IsOptional()
  @IsDate()
  issueDate?: Date;
}
