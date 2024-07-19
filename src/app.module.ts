import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './User/user.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/NEST-DB'),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
