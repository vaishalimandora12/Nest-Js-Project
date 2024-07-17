import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInterface } from './interface/user.interface';
import { CreateUserDTO } from './dto/create.user.dtio';
@Injectable()
export class UserService {
    constructor(@InjectModel('UserInterface') private userModel: Model<UserInterface>) { }
    
}
