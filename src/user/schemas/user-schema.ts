

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export enum userRole {
    Admin = "ADMIN",
    student = "STUDENT"
}

//@Schema() → ye class ko MongoDB collection ke schema me convert karta hai.
@Schema()
export class User {
//@Prop() → collection ke andar fields define karta hai.
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;
  
  @Prop({enum:userRole, default:userRole.student})
  role:string
}

//SchemaFactory.createForClass() → mongoose schema generate karta hai.
export const UserSchema = SchemaFactory.createForClass(User);
