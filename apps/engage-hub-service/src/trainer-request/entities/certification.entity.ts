import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TrainerRequest } from './trainer-request.entity';
import { UUID } from 'crypto';

@Entity()
export class Certification {
  @PrimaryGeneratedColumn('uuid')
  CertificationId: UUID;

  @Column()
  name: string;

  @Column()
  issuedBy: string;

  @Column({ type: 'date' })
  issueDate: Date;

  @ManyToOne(
    () => TrainerRequest,
    (trainerRequest) => trainerRequest.certifications,
    { onDelete: 'CASCADE' },
  )
  trainerRequest: TrainerRequest;
}
