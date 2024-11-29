import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { UserTypes } from './user_type.entity';
import { UUID } from 'crypto';
import { ScheduleEvent } from 'src/events/entities/event.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: UUID;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({
    type: 'enum',
    enum: UserTypes.getAllUsers(),
    default: UserTypes.User,
  })
  role: string;
  
  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => ScheduleEvent, (event) => event.user)
  scheduleEvents: ScheduleEvent[]; 
}
