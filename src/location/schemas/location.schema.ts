/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const LocationSchema = new mongoose.Schema(
  {
    location: {
      type: String,
      lowercase: true,
      trim: true,
      minLength: 3,
      maxlength: 100,
      unique: true,
    },
  },
  { versionKey: false, timestamps: false },
);
