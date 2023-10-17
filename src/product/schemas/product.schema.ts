/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema(
  {
    title: String,
    img: String,
    id: String,
    category: String,
    subCategory: String,
    subCategory2: String,
  },
  { versionKey: false, timestamps: false },
);
