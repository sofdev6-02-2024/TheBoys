import { IsEmail, IsNotEmpty, IsString, IsOptional, IsIn } from 'class-validator';

export class SendEmailDto {
  @IsEmail()
  @IsNotEmpty()
  toEmail: string;

  @IsIn(['Accepted', 'Rejected', 'Discontinued'], { message: 'Status must be one of: Accepted, Rejected, Discontinued' })
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsOptional() 
  comments?: string | null = null;
}
