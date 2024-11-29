import { UUID } from 'crypto';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { RelationTypes } from './relation_type.entity';

@Entity()
export class TrainerUser {
  @PrimaryGeneratedColumn('uuid')
  trainerId: UUID;

  @Column('simple-array')
  userIds: UUID[]; 

  @Column({
    type: 'enum',
    enum: RelationTypes.getAllRelations(),
    default: RelationTypes.TeamMember,
  })
  relationType: string;

  @CreateDateColumn()
  createdAt: Date; 
}
