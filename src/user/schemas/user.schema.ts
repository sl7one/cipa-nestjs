/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
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
  },
  { versionKey: false, timestamps: false },
);
