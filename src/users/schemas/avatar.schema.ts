import { Schema } from 'mongoose';

export const AvatarSchema = new Schema({
  userId: { type: String, required: true },
  filePath: { type: String },
  hash: { type: String },
});

export interface Avatar extends Document {
    userId: string;
    filePath: string;
    hash: string;
  }