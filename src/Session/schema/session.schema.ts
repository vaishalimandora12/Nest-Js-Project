import * as mongoose from 'mongoose';
const { Schema } = mongoose;

export const SessionSchema = new mongoose.Schema({
  accessToken: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  userType: {
    type: String,
  },
});
