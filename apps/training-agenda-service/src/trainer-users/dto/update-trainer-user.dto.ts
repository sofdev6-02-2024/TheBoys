import { IsArray, IsEnum, IsOptional, IsUUID } from 'class-validator';
import { UUID } from 'crypto';
import { UserTypes } from 'src/users/entities/user_type.entity';

export class UpdateTrainerUserDto {
  @IsOptional()
  @IsUUID()
  trainerId?: UUID;

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  userIds?: UUID[];

  @IsOptional()
  @IsEnum(UserTypes.getAllUsers(), {
    message: `The relation must be one of: ${UserTypes.getAllUsers().join(', ')}`,
  })
  relationType?: string;
}
