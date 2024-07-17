import * as mongoose from 'mongoose';

export const BlogSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  phone: {
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
});
