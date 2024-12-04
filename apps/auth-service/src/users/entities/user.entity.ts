import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ versionKey: false })
export class User extends Document {
  @Prop({ type: Types.ObjectId })
  userId: Types.ObjectId;

  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  userImage: string;

  @Prop({ default: 'User' })
  role: string;

  @Prop({ default: 'UTC' })
  timezone: string;

  @Prop({ type: Date, default: Date.now })
  created_at: Date;

  @Prop({ type: Date, nullable: true })
  deleteAt: Date;

  @Prop({ type: Types.ObjectId, ref: 'UserInformation' })
  userInformation: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});
