import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<Course>;

export enum userLevel {
  Beginner = 'BIGINNER',
  Intermediate = 'INTERMEDIATE',
  Advanced = 'ADVANCED',
}

@Schema()
export class Course {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ enum: userLevel, default: userLevel.Beginner })
  level: string;

  @Prop({ required: true })
  price: number;

  @Prop({ default: null })
  created_at: Date;

  @Prop({ default: null })
  updated_at: Date;

  @Prop({ default: null })
  deleted_at: Date; // Soft delete
}

//SchemaFactory.createForClass() → mongoose schema generate karta hai.
export const CourseSchema = SchemaFactory.createForClass(Course);
