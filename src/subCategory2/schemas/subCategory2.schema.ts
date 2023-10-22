/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';
import { categoryShema } from '../../category/schemas/category.schema';

export const SubCategory2Schema = new mongoose.Schema(
  {
    subCategory2: {
      type: [categoryShema],
    },
  },
  { versionKey: false, timestamps: false },
);
