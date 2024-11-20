import { IsEmail, IsOptional, IsString, IsUrl, MinLength } from "class-validator";

export class UpdateUserDto {

  @IsString()
  @MinLength(1)
  @IsOptional()
  username?: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  role?: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  userImage?: string;
}
