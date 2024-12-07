import { IsString } from 'class-validator';

export class UpdateCommunityUsersDto {
  @IsString({ each: true }) 
  users: string[]; 
}
