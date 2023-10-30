/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const AuthSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minLength: 2,
      maxlength: 50,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      match: /^(\+380\d{9})$/,
      minLength: 13,
      maxlength: 13,
      unique: true,
    },
    password: {
      type: String,
      minLength: 6,
    },
    token: {
      type: String,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  { versionKey: false, timestamps: false },
);
