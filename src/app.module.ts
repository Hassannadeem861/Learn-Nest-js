import { ConfigModule, ConfigService  } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import {MongooseModule} from "@nestjs/mongoose"
import { Connection } from 'mongoose';
import { CoursesModule } from './courses/courses.module';

@Module({
    
  imports: [
    // ✅ Step 1: Load .env file
    ConfigModule.forRoot({
      isGlobal:true // so you can use env anywhere
    }),
   
     // ✅ Step 2: Use forRootAsync to load MongoDB URI dynamically from .env
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>('MONGODB_URI');
        // console.log("uri: ",uri)
        // if (!uri) {
        //   console.error('❌ ERROR: MONGODB_URI is undefined! Check your .env file.');
        // } else {
        //   console.log('✅ MongoDB URI from .env:', uri);
        // }

        return {
          uri,
          //onConnectionCreate: Mongoose connection ke create hone ke time call hota hai.
          //Iske andar humne .on() events attach kiye hain taake har connection status console me dikhe.
          onConnectionCreate: (connection: Connection) => {
            // ✅ Connection events
            connection.on('connected', () => console.log('✅ MongoDB Connected Successfully'));
            connection.on('open', () => console.log('📂 MongoDB Connection is Open'));
            connection.on('disconnected', () => console.log('❌ MongoDB Disconnected'));
            connection.on('reconnected', () => console.log('🔁 MongoDB Reconnected'));
            connection.on('disconnecting', () => console.log('⚠️ MongoDB Disconnecting...'));
            connection.on('error', (err) => console.error('💥 MongoDB Connection Error:', err.message));

            return connection;
          },
        };
      },
    }),
     // ✅ Your custom modules
    AuthModule,
     UserModule,
     CoursesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
