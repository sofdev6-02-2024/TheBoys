import { UUID } from "crypto";
import { User } from "src/users/entities/user.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UsersInformation {

  @PrimaryGeneratedColumn('uuid')
  //@Column({primary: true, generated: true})
  id: UUID;

  @Column()
  user_id: number;

  @Column()
  height: number;

  @Column("decimal")
  weight: number;

  @Column()
  age: number;

  @Column()
  gender: string;

  @Column("decimal")
  body_fat_porcentage: number;

  @Column()
  activity_level: string;

  @Column()
  goal: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @DeleteDateColumn()
  deleteAt: Date;


  @OneToOne(() => User, (user) => user.userInformation)
  @JoinColumn({ name: "user_id" }) 
  user: User; 
}
