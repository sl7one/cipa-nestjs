/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

const fullOrder = new mongoose.Schema({
  title: { type: String, minlength: 3 },
  img: { type: String },
  category: { type: String, minlength: 3 },
  subCategory: { type: String, minlength: 3, required: false },
  subCategory2: { type: String, minlength: 3, required: false },

  price: { type: Number, min: 0 },
  quantity: { type: Number, min: 0 },
  total: { type: Number, min: 0 },
});

export const OrderSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
    },

    client: {
      type: {
        name: {
          type: String,
          lowercase: true,
          trim: true,
          minlength: 3,
          maxlength: 100,
          required: true,
        },
        phone: {
          type: String,
          match: /^(\+380\d{9})$/,
          minLength: 13,
          maxlength: 13,
          required: true,
        },
      },
    },

    order: {
      type: [fullOrder],
      minlength: 1,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    location: {
      type: String,
      required: false,
    },

    message: {
      type: String,
      required: false,
    },

    total: {
      type: Number,
    },
  },
  { versionKey: false },
);
