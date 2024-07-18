import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInterface } from './interface/user.interface';
import { CreateUserDTO } from './dto/create.user.dtio';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserInterface>) {}

  async signUpUser(signUpData: CreateUserDTO): Promise<any> {
    const { name, phone, countryCode, email, password, image, clgId, clgName } =
      signUpData;
    const findUser = await this.userModel.findOne({ email: email });
    if (findUser) {
      return {
        message: 'User Already Exists! Please Login.',
        status: 200,
      };
    }
    const hashed = await bcrypt.hash(password, 10);
    const refData = {
      ...signUpData,
      password: hashed,
    };
    const create = await this.userModel.create(refData);
    if (create) {
      return {
        message: 'User Created Successfully',
        status: 200,
        data: create,
      };
    }
    return {
      message: 'User Creation Failed',
      status: 400,
    };
  }

  async deleteUser(user_id: string): Promise<any> {
    const deleteUser = await this.userModel.findByIdAndDelete({
      _id: user_id,
    });
    if (deleteUser) {
      return {
        message: 'User Deleted',
        status: 200,
      };
    }
  }
}
