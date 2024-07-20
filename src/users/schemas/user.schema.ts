import {Schema, Document} from 'mongoose';

export const UserSchema = new Schema({
    email: {type: String, required: true},
    avatarUrl: {type: String}
});

export interface User extends Document {
    email: string;
    avatarUrl: string;
   
  }