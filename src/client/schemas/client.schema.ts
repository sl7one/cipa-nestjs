/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const ClientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
      minLength: 2,
      maxlength: 100,
    },
    phone: {
      type: String,
      match: /^(\+380\d{9})$/,
      minLength: 9,
      maxlength: 13,
      required: true,
    },
    location: {
      type: String,
      minLength: 2,
      maxlength: 100,
    },
    message: {
      type: String,
      minLength: 2,
      maxlength: 300,
    },
  },
  { versionKey: false },
);
