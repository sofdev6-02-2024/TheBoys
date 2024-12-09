import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { VisibilityTypes } from './visibility_type.entity';
import { UUID } from 'crypto';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class ScheduleEvent {
  @PrimaryGeneratedColumn('uuid')
  eventId: UUID;

	@Column()
  userId: UUID;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('date')
  eventDate: Date;

  @Column('time')
  startTime: string;

  @Column('time')
  endTime: string;

	@Column({
    type: 'enum',
    enum: VisibilityTypes.getAllVisibilitys(),
		default: VisibilityTypes.Public,
  })
  visibility: string;

  @Column({ default: null, nullable: true })
  location?: string;

  @Column({  default: null, nullable: true })
  meetingLink?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: false })
  isCancelled: boolean;

  @ManyToOne(() => User, (user) => user.scheduleEvents) 
  @JoinColumn({ name: 'userId' })
  user: User; 
}
