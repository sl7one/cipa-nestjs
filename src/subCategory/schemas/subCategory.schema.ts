import * as mongoose from 'mongoose';

export const SubCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxLength: 30,
      lowercase: true,
      trim: true,
      unique: true,
    },
  },
  { versionKey: false, timestamps: false },
);
