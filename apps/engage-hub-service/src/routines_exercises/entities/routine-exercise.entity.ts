import { UUID } from 'crypto';
import { Routine } from 'src/routines/entities/routine.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RoutineExercise {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column()
  routineId: UUID;

  @Column()
  exerciseId: UUID;

  @Column({ nullable: true })
  repetitions: number;

  @Column({ nullable: true })
  time: number;

  @Column({
    name: 'status',
    type: 'enum',
    enum: ['not started', 'in progress', 'completed'],
    default: 'not started',
  })
  status: 'not started' | 'in progress' | 'completed';

  @ManyToOne(() => Routine, (routine) => routine.exercises, { cascade: true })
  routine: Routine;
}
