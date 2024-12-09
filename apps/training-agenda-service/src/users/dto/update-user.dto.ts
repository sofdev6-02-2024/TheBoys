import { IsString, IsEmail, IsEnum, IsOptional } from 'class-validator';
import { UserTypes } from '../entities/user_type.entity';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsEnum(UserTypes.getAllUsers(), {
    message: `specialization must be one of: ${UserTypes.getAllUsers().join(', ')}`,
  })
  role?: string;
}
