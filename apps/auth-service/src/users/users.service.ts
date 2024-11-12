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
      select: [
        'userId', 
        'username', 
        'email', 
        'password', 
        'role', 
        'timezone', 
        'created_at'],
    });
  }

  async findOne(id: ObjectId): Promise<User> {
    const users = await this.findAll(); 
    const user = users.find(user => user.userId.toString() === id.toString());
  
    if (!user) {
      throw new Error('User not found');
    }
  
    return user;
  }

  async update(id: ObjectId, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    if (!user) {
      throw new Error('User not found');
    }

    const updatedUser = Object.assign(user, updateUserDto);
    await this.userRepository.save(updatedUser);
    return updatedUser;
  }

  async remove(id: ObjectId) {
    const user = await this.findOne(id); 

    if (!user) {
      throw new Error('User not found');
    }

    await this.userRepository.remove(user);  
    return { message: 'User successfully removed' }; 
  }
}
