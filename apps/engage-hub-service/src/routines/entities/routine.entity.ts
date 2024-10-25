import { UUID } from 'crypto';
import { Exercise } from 'src/exercises/entities/exercise.entity';
import { UserRoutine } from 'src/user/entities/user.routine.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Routine {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column()
  title: string;

  @Column({ nullable: true })
  creatorId: UUID;

  @Column({ type: 'enum', enum: ['easy', 'medium', 'hard'] })
  difficultLevel: 'easy' | 'medium' | 'hard';

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => UserRoutine, (userRutine) => userRutine.rutine)
  userRutine: UserRoutine;

  @ManyToMany(() => Exercise)
  @JoinTable()
  exercises: Exercise[];
}
