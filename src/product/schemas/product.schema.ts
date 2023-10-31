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
    sub2Category: {
      type: String,
      lowercase: true,
      trim: true,
      required: false,
    },
    price: {
      type: Number,
      min: 0,
    },
    sortIndex: { type: Number, default: 0, required: false },
  },
  { versionKey: false, timestamps: false },
);
