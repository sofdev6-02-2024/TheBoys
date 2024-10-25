import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto {

  @IsString()
  @MinLength(1)
  username: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
