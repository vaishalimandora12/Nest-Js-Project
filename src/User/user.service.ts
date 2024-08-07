import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInterface } from './interface/user.interface';
import { CreateUserDTO } from './dto/create.user.dtio';
import { CreateSessionDTO } from 'src/Session/dto/create.session.dto';
import { SessionInterface } from 'src/Session/interface/session.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { enumValue } from 'src/utils/enum';
@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService,
    @InjectModel('User') private userModel: Model<UserInterface>,
    @InjectModel('Session') private sessionModel: Model<SessionInterface>,
  ) {}
  async signUpUser(signUpData: CreateUserDTO): Promise<any> {
    const {
      name,
      phone,
      countryCode,
      email,
      password,
      image,
      clgId,
      clgName,
      userType,
    } = signUpData;
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
      let signToken = this.jwtService.sign({
        userId: create._id,
        email: create.email,
      });
      const sessionData: CreateSessionDTO = {
        accessToken: signToken,
        userId: create._id.toString(),
        userType: create.userType,
      };
      const createSession = await this.sessionModel.create(sessionData);
      const User = await this.userModel.findOne(
        { _id: create._id },
        { password: 0 },
      );
      return {
        message: 'User Created Successfully',
        status: 200,
        data: User,
        createSession,
      };
    }
    return {
      message: 'User Creation Failed',
      status: 400,
    };
  }

  async login(loginData: CreateUserDTO): Promise<any>{
    const { email, password } = loginData;
    const findUser = await this.userModel.findOne({ email: email });
    if (!findUser) {
      return {
        message: 'User Not Found',
        status: 400,
      };
    }
    const com_pass = await bcrypt.compare(password, findUser.password);
      if (!com_pass) {
        return {
          message: 'Password Invalid.',
          status: 400,
        };
    }
     let signToken = this.jwtService.sign({
       userId: findUser._id,
       email: findUser.email,
     });
      const createSession = await this.sessionModel.updateOne(sessionData);
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
