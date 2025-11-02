import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user-schema';

@Module({
  //MongooseModule.forFeature() → ye batata hai ke is module me kaunse models (collections) register karne hain.
  //Yani ab NestJS ko pata hai ke User model exist karta hai aur uska schema kya hai.
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UserService],
  exports: [UserService, MongooseModule], // 👈 export dono cheezen
})
export class UserModule {}
