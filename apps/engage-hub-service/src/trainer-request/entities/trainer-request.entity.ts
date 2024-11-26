import { UUID } from 'crypto';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Certification } from './certification.entity';
import { SpecializationTypes } from './especialization-types.entity';
import { StatusTypes } from './status-types.entity';

@Entity()
export class TrainerRequest {
  @PrimaryGeneratedColumn('uuid')
  TrainerRequestId: UUID;

  @Column()
  experience: string;

  @OneToMany(
    () => Certification,
    (certification) => certification.trainerRequest,
    {
      cascade: true,
      eager: true,
    },
  )
  certifications: Certification[];

  @Column({
    type: 'enum',
    enum: SpecializationTypes.getAllSpecializations(),
  })
  specialization: string;

  @Column({
    type: 'enum',
    enum: StatusTypes.getAllStatuses(),
    default: StatusTypes.Pending,
  })
  status: string;

  @Column({ nullable: true, default: null })
  comments: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({ type: 'uuid' })
  userId: UUID;
}
