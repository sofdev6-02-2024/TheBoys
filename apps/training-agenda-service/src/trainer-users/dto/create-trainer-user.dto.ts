import { IsArray, IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { UUID } from 'crypto';
import { UserTypes } from 'src/users/entities/user_type.entity';

export class CreateTrainerUserDto {
  @IsNotEmpty()
  @IsUUID()
  trainerId: UUID;

  @IsArray()
  @IsUUID('4', { each: true })
  userIds: UUID[];

  @IsNotEmpty()
  @IsEnum(UserTypes.getAllUsers(), {
    message: `The relation must be one of: ${UserTypes.getAllUsers().join(', ')}`,
  })
  relationType: string;
}
