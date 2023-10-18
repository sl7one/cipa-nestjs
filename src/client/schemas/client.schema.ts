/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const ClientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      lowercase: true,
      trim: true,
      minLength: 3,
      maxlength: 100,
      required: true,
    },
    phone: {
      type: String,
      match: /^(\+380\d{9})$/,
      minLength: 13,
      maxlength: 13,
      required: true,
      unique: true,
    },
  },
  { versionKey: false },
);
