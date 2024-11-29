import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrainerUser } from './entities/trainer-user.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateTrainerUserDto } from './dto/create-trainer-user.dto';
import { UpdateTrainerUserDto } from './dto/update-trainer-user.dto';
import { UUID } from 'crypto';

@Injectable()
export class TrainerUsersService {
  constructor(
    @InjectRepository(TrainerUser)
    private readonly trainerUserRepository: Repository<TrainerUser>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createTrainerUserDto: CreateTrainerUserDto): Promise<TrainerUser> {
    const { trainerId, userIds, relationType } = createTrainerUserDto;

    const trainer = await this.userRepository.findOne({ where: { userId: trainerId } });
    if (!trainer) {
      throw new NotFoundException(`Trainer with ID ${trainerId} not found.`);
    }
  
    const users = await this.userRepository.findByIds(userIds);
    if (users.length !== userIds.length) {
      throw new BadRequestException('One or more userIds are invalid.');
    }

    const trainerUser = this.trainerUserRepository.create({
      trainerId,
      userIds,
      relationType,
    });

    return this.trainerUserRepository.save(trainerUser);
  }

  async findAll(): Promise<TrainerUser[]> {
    return this.trainerUserRepository.find({
      relations: ['users'], 
    });
  }

  async findOne(trainerId: UUID): Promise<TrainerUser> {
    const trainerUser = await this.trainerUserRepository.findOne({
      where: { trainerId },
      relations: ['users'], 
    });
    if (!trainerUser) {
      throw new NotFoundException(`TrainerUser with ID ${trainerId} not found.`);
    }
    return trainerUser;
  }

  async update(trainerId: UUID, updateTrainerUserDto: UpdateTrainerUserDto): Promise<TrainerUser> {
    const trainerUser = await this.trainerUserRepository.findOne({ where: { trainerId } });
  
    if (!trainerUser) {
      throw new NotFoundException(`TrainerUser with ID ${trainerId} not found.`);
    }
  
    if (updateTrainerUserDto.userIds) {
      const users = await this.userRepository.findByIds(updateTrainerUserDto.userIds);
      if (users.length !== updateTrainerUserDto.userIds.length) {
        throw new BadRequestException('One or more userIds are invalid.');
      }
    }
  
    Object.assign(trainerUser, updateTrainerUserDto);

    return this.trainerUserRepository.save(trainerUser);
  }

  async remove(trainerId: UUID): Promise<void> {
    const trainerUser = await this.findOne(trainerId);
    await this.trainerUserRepository.remove(trainerUser);
  }
}
