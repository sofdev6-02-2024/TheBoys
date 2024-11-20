import { UUID } from 'crypto';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class TrainerRequest {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column()
  experience: string;

  @Column('jsonb')
  certifications: {
    name: string;
    issuedBy: string;
    issueDate: Date;
  }[];

  @Column()
  availability: string;

  @Column({ type: 'enum', enum: ['Weightlifting', 'Resistance Training', 'Cardio'] })
  specialization: 'Weightlifting' | 'Resistance Training' | 'Cardio';

  @Column({ type: 'enum', enum: ['Pending', 'Accepted', 'Rejected', 'Discontinued'], default: 'Pending' })
  status: 'Pending' | 'Accepted' | 'Rejected' | 'Discontinued';

  @Column({ nullable: true })
  comments: string;

  @Column({ type: 'uuid' })
  userId: UUID;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
