import { EntityRepository, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserRoutine } from './user.routine.entity';
import { UUID } from 'crypto';

@Injectable()
@EntityRepository(UserRoutine)
export class UserRoutineRepository extends Repository<UserRoutine> {
  async createUserRoutine(userId: UUID, routineId: UUID): Promise<UserRoutine> {
    const userRoutine = this.create({
      userId,
      rutine: { id: routineId },  
      status: 'not started', 
    });

    return this.save(userRoutine);
  }

  async findByUserId(userId: UUID): Promise<UserRoutine[]> {
    return this.find({ where: { userId } });
  }
}

