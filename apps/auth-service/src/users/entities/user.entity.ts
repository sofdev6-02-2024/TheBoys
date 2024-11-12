import { Entity, ObjectIdColumn, Column, OneToOne } from 'typeorm';
import { ObjectId } from 'mongodb';
import { UsersInformation } from 'src/users-informations/entities/users-information.entity';

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: 'User' })
  role: string;

  @Column({ default: 'UTC' })
  timezone: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  deleteAt: Date;

  @OneToOne(() => UsersInformation, (usersInformation) => usersInformation.user, { cascade: true })
  userInformation: UsersInformation;
}
