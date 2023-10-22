/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
import { categoryShema } from '../../category/schemas/category.schema';

export const SubCategorySchema = new mongoose.Schema(
  {
    subCategory: {
      type: [categoryShema],
    },
  },
  { versionKey: false, timestamps: false },
);
