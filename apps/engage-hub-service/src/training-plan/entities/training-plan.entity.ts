import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('training_plans')
export class TrainingPlan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  specialization: string;

  @Column('simple-array', { nullable: true })
  images: string[];

  @Column('simple-array', { nullable: true })
  availableTimes: string[];

  @Column({ nullable: true })
  presentationVideo: string;

  @Column('int')
  sessionDuration: number;

  @Column('int')
  totalDuration: number;

  @Column('float')
  cost: number;

  @Column('simple-array', { nullable: true })
  prerequisites: string[];

  @Column()
  userId: string;
}
