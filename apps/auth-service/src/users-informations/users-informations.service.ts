import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  UserInformation,
  UserInformationDocument,
} from './entities/users-information.entity';
import { CreateUserInformationDto } from './dto/create-users-information.dto';
import { UpdateUserInformationDto } from './dto/update-users-information.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserService } from '../users/users.service';

@Injectable()
export class UserInformationsService {
  constructor(
    @InjectModel(UserInformation.name)
    private readonly userInformationModel: Model<UserInformationDocument>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  private formatUserInformation(user: any) {
    const { _id, ...formattedUser } = user;
    return {
      id: _id.toString(),
      ...formattedUser,
      weight: user.weight.toString(),
      body_fat_porcentage: user.body_fat_porcentage.toString(),
    };
  }

  async create(
    createUserInformationDto: CreateUserInformationDto,
  ): Promise<UserInformation> {
    const { userId } = createUserInformationDto;

    if (!Types.ObjectId.isValid(userId)) {
      throw new Error('Invalid user ID');
    }

    const userExists = await this.userService.findOne(
      new Types.ObjectId(userId),
    );

    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    const newUserInformation = new this.userInformationModel(
      createUserInformationDto,
    );

    return newUserInformation
      .save()
      .then((doc) => doc.toObject({ versionKey: false }));
  }

  async findAll(): Promise<UserInformation[]> {
    const users = await this.userInformationModel.find().lean().exec();
    return users.map((user: any) => this.formatUserInformation(user));
  }

  async findOne(id: Types.ObjectId): Promise<UserInformation> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid user ID');
    }

    const user = await this.userInformationModel
      .findOne({ _id: id })
      .lean()
      .exec();

    if (!user) {
      throw new NotFoundException('User information not found');
    }

    return this.formatUserInformation(user);
  }

  async update(
    id: Types.ObjectId,
    updateUserInformationDto: UpdateUserInformationDto,
  ): Promise<UserInformation> {
    const userInformation = await this.findOne(id);

    if (!userInformation) {
      throw new NotFoundException('User Information not found');
    }

    const updatedUserInformation = await this.userInformationModel
      .findByIdAndUpdate(id, updateUserInformationDto, {
        new: true,
      })
      .lean()
      .exec();

    console.log('Updated User Information: ', updatedUserInformation);

    return this.formatUserInformation(updatedUserInformation);
  }

  async remove(id: Types.ObjectId): Promise<{ message: string }> {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User information not found');
    }

    await this.userInformationModel.findByIdAndDelete(id).exec();

    return { message: 'User information successfully removed' };
  }

  async removeUserInformationByUserId(userId: Types.ObjectId): Promise<void> {
    await this.userInformationModel.deleteMany({ userId: userId }).exec();
  }
}
