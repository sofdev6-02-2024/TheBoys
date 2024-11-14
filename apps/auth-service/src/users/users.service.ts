import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserInformationsService } from 'src/users-informations/users-informations.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @Inject(forwardRef(() => UserInformationsService))
    private readonly userInformationService: UserInformationsService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const createdUser = new this.userModel({
        ...createUserDto,
        role: createUserDto.role || 'User',
        timezone: 'UTC',
        created_at: new Date(),
        deleteAt: null,
      });

      await createdUser.save();
      return createdUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Error creating user');
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOne(id: Types.ObjectId) {
    const user = await this.userModel.findOne({ _id: id }).exec();

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async update(
    id: Types.ObjectId,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.findOne(id);

    if (!user) {
      throw new Error('User not found');
    }

    const updatedUser = await this.userModel
      .findByIdAndUpdate(user._id, updateUserDto, {
        new: true,
      })
      .exec();

    return updatedUser;
  }

  async remove(id: Types.ObjectId): Promise<{ message: string }> {
    const user = await this.findOne(id);

    if (!user) {
      throw new Error('User not found');
    }

    await this.userInformationService.removeUserInformationByUserId(id);

    await this.userModel.findByIdAndDelete(user._id).exec();
    return { message: 'User successfully removed' };
  }
}
