import * as mongoose from 'mongoose';

export const ClientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      lowercase: true,
      trim: true,
      minLength: 3,
      maxlength: 100,
    },
    phone: {
      type: String,
      match: /^(\+380\d{9})$/,
      minLength: 13,
      maxlength: 13,
      unique: true,
    },
  },
  { versionKey: false },
);
