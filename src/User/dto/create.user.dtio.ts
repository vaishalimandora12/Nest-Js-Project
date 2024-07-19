import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsEnum,
} from 'class-validator';
import { enumValue } from 'src/utils/enum';
export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  countryCode: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsString()
  image?: string;

  @IsNotEmpty()
  @IsString()
  clgId: string;

  @IsNotEmpty()
  @IsString()
  clgName: string;

  @IsEnum(enumValue.userType)
  userType: string;
}
