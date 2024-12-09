import { IsString, IsNotEmpty, IsEmail, IsEnum } from 'class-validator';
import { UserTypes } from '../entities/user_type.entity';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsEnum(UserTypes.getAllUsers(), {
    message: `The role must be one of: ${UserTypes.getAllUsers().join(', ')}`,
  })
  role: string;
}
