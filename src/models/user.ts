import * as mongoose from 'mongoose';

const { Schema } = mongoose;

export type UserModel = mongoose.Document & {
  uid: string,
  access_token: string,
  expires_in: number,
  remind_in: string,
}

const userSchema = new Schema({
  uid: String,
  access_token: String,
  expires_in: Number,
  remind_in: String,
});

const User = mongoose.model('User', userSchema);
export default User;
