import {
  Controller,
  Post,
  Body,
  Res,
  Delete,
  Param,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create.user.dtio';
import { Response } from 'express';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async signUp(@Body() createUserDto: CreateUserDTO, @Res() res: Response) {
    try {
      const result = await this.userService.signUpUser(createUserDto);
      return res.status(result.status).json(result);
    } catch (e) {
      return res.status(500).json({
        message: e.message,
        status: 500,
      });
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') userId: string, @Res() res: Response) {
    try {
      const result = await this.userService.deleteUser(userId);
      return res.status(result.status).json(result);
    } catch (e) {
      return res.status(500).json({
        message: e.message,
        status: 500,
      });
    }
  }
}
