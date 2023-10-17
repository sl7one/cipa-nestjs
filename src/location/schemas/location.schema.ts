/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const LocationSchema = new mongoose.Schema(
  {
    location: { type: String },
    message: { type: String },
  },
  { versionKey: false, timestamps: false },
);
