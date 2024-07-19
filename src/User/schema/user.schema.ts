import * as mongoose from 'mongoose';
import { enumValue } from 'src/utils/enum';

export const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  phone: {
    type: Number,
  },
  countryCode: {
    type: Number,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  image: {
    type: String,
  },
  clgId: {
    type: String,
  },
  clgName: {
    type: String,
  },
  userType: {
    type: String,
    enum: Object.values(enumValue.userType),
  },
});
