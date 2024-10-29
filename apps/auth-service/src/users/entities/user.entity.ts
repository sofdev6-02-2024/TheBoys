import { UsersInformation } from "src/users-informations/entities/users-information.entity";
import { Column, DeleteDateColumn, Entity, OneToOne } from "typeorm";

@Entity()
export class User {

  //@PrimaryGeneratedColumn()
  @Column({primary: true, generated: true})
  id: number;

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

  
  @OneToOne(() => UsersInformation, (usersInformation) => usersInformation.user, { cascade: true })
  userInformation: UsersInformation;
}
