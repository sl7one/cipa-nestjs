/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

const fullOrder = new mongoose.Schema({
  product: {
    type: {
      title: { type: String, minlength: 3 },
      img: { type: String, minlength: 3 },
      id: { type: String, minlength: 3 },
      category: { type: String, minlength: 3 },
      subCategory: { type: String, minlength: 3, required: false },
      subCategory2: { type: String, minlength: 3, required: false },
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    },
  },
  price: { type: Number, min: 0 },
  order: { type: Number, min: 0 },
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
        _id: { type: mongoose.SchemaTypes.ObjectId, ref: 'Client' },
      },
    },
    order: {
      type: [fullOrder],
      required: true,
      minlength: 1,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    location: {
      type: {
        _id: { type: mongoose.SchemaTypes.ObjectId, ref: 'Location' },
        location: { type: String, minlength: 3, maxlength: 100 },
      },
      required: false,
    },
    message: {
      type: String,
      minLength: 3,
      maxlength: 300,
      required: false,
    },

    total: {
      type: Number,
    },
  },
  { versionKey: false },
);
