import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSchema } from './schema/user.schema';
import { SessionSchema } from 'src/Session/schema/session.schema';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Session', schema: SessionSchema }]),
    JwtModule.register({
      secret: 'TEST',
      signOptions: { expiresIn: '10h' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

