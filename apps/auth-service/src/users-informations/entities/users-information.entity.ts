import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { DeleteDateColumn, OneToOne } from 'typeorm';

export type UserInformationDocument = UserInformation & Document;

@Schema({ versionKey: false })
export class UserInformation {
  @Prop({ type: Types.ObjectId })
  userInformationId: Types.ObjectId;

  @Prop()
  userId: Types.ObjectId;

  @Prop()
  height: number;

  @Prop({ type: MongooseSchema.Types.Decimal128 })
  weight: number;

  @Prop()
  age: number;

  @Prop()
  gender: string;

  @Prop({ type: MongooseSchema.Types.Decimal128 })
  body_fat_porcentage: number;

  @Prop()
  activity_level: string;

  @Prop()
  goal: string;

  @Prop({ type: Date, default: () => new Date() })
  created_at: Date;

  @Prop({ type: Date, default: () => new Date(), onUpdate: new Date() })
  updated_at: Date;

  @DeleteDateColumn()
  deleteAt: Date;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;
}

export const UserInformationSchema =
  SchemaFactory.createForClass(UserInformation);

UserInformationSchema.set('toJSON', {
  transform: function (ret) {
    ret.id = ret._id; 
    delete ret._id; 
    return ret;
  },
});