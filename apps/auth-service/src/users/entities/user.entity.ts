import { UUID } from 'crypto';
import { UsersInformation } from 'src/users-informations/entities/users-information.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column()
  timezone: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @DeleteDateColumn()
  deleteAt: Date;

  @OneToOne(
    () => UsersInformation,
    (usersInformation) => usersInformation.user,
    { cascade: true },
  )
  userInformation: UsersInformation;
}
