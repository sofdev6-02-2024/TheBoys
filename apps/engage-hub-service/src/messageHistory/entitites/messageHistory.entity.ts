import { UUID } from 'crypto';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class MessageHistory {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column()
  userName: string;

  @Column()
  userId: string; 

  @Column()
  communityId: string; 

  @Column('text')
  message: string; 

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
