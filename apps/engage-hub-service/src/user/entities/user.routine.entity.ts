import { UUID } from 'crypto';
import { Routine } from 'src/routines/entities/routine.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserRoutine {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column()
  userId: UUID;

  @Column({
    type: 'enum',
    enum: ['not started', 'in progress', 'completed'],
    default: 'not started',
  })
  status: 'not started' | 'in progress' | 'completed';

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => Routine, (rutine) => rutine.userRutine)
  rutine: Routine[];
}
