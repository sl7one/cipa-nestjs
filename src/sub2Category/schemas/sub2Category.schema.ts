/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const Sub2CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxLength: 30,
      lowercase: true,
      trim: true,
      unique: true,
    },
  },
  { versionKey: false, timestamps: false },
);
