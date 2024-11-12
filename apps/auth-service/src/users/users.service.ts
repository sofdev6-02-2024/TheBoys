import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = this.userRepository.create({
        ...createUserDto,
        role: 'User',
        timezone: 'UTC',
        created_at: new Date(),
        deleteAt: null,
      });

      await this.userRepository.save(user);

      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Error creating user');
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      select: ['id', 'username', 'email', 'password', 'role', 'timezone', 'created_at'],
    });
  }

  async findOne(id: ObjectId): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: id } });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async update(id: ObjectId, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.preload({
      id: id,
      ...updateUserDto,
    });

    if (!user) {
      throw new Error('User not found');
    }

    return await this.userRepository.save(user);
  }

  async remove(id: ObjectId): Promise<void> {
    await this.userRepository.softDelete(id);
  }
}
