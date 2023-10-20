/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      lowercase: true,
      trim: true,
      minLength: 3,
      maxlength: 100,
    },
    img: {
      type: String,
    },
    category: { type: String, lowercase: true, trim: true },
    subCategory: { type: String, lowercase: true, trim: true, required: false },
    subCategory2: {
      type: String,
      lowercase: true,
      trim: true,
      required: false,
    },
  },
  { versionKey: false, timestamps: false },
);
