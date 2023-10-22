/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const categoryShema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxLength: 30,
    lowercase: true,
    trim: true,
    unique: true,
  },
});

export const CategorySchema = new mongoose.Schema(
  {
    category: {
      type: [categoryShema],
    },
  },
  { versionKey: false, timestamps: false },
);
