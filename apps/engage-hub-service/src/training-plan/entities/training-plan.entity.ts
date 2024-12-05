import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import {
  IsArray,
  IsOptional,
  IsString,
  IsUrl,
  ArrayMinSize,
  Matches,
} from 'class-validator';

@Entity('training_plans')
export class TrainingPlan {
  @PrimaryGeneratedColumn('uuid')
  TrainingPlansID: string;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  description: string;

  @Column()
  @IsString()
  specialization: string;

  @Column('simple-array', { nullable: true })
  @IsArray()
  @ArrayMinSize(1, { message: 'At least one image is required' })
  @Matches(/\.(jpg|jpeg|png|gif)$/i, {
    message: 'Each image URL must end with .jpg, .jpeg, .png, or .gif',
  })
  images: string[];

  @Column('simple-array', { nullable: true })
  @IsArray()
  @IsOptional()
  @Matches(/^[A-Za-z]+:\d{2}:\d{2}-\d{2}:\d{2}$/, {
    each: true,
    message:
      'Each available time must follow the format "Day:HH:MM-HH:MM", e.g., "Monday:08:00-09:00"',
  })
  availableTimes: string[];

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  @IsUrl()
  @Matches(/\.(mp4|mov|avi|mkv)$/i, {
    message: 'The video URL must end with .mp4, .mov, .avi, or .mkv',
  })
  presentationVideo: string;

  @Column('int')
  @IsOptional()
  sessionDuration: number;

  @Column('int')
  @IsOptional()
  totalDuration: number;

  @Column('float')
  cost: number;

  @Column('simple-array', { nullable: true })
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  prerequisites: string[];

  @Column()
  @IsString()
  userId: string;

  @Column({ default: false })
  isDeleted: boolean;
}
