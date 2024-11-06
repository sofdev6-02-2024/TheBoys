import { UUID } from 'crypto';
import { RoutineExercise } from 'src/routines_exercises/entities/routine-exercise.entity';
import { UserRoutine } from 'src/user/entities/user.routine.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Routine {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column()
  title: string;

  @Column({ nullable: true })
  creatorId: UUID;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: ['easy', 'medium', 'hard'] })
  difficultLevel: 'easy' | 'medium' | 'hard';

  @Column()
  imageUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => UserRoutine, (userRutine) => userRutine.rutine)
  userRutine: UserRoutine;

  @OneToMany(
    () => RoutineExercise,
    (routineExercise) => routineExercise.routine,
  )
  exercises: UUID[];
}
