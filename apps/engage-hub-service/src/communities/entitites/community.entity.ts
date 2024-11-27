import { UUID } from 'crypto';
import { SpecializationTypes } from 'src/trainer-request/entities/especialization-types.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Community {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: SpecializationTypes.getAllSpecializations(),
  })
  type: string;

  @Column()
  cost: number;

  @Column()
  imageUrl: string;

  @Column()
  trainerId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
