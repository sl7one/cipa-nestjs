/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    client: {
      name: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
      },
      phone: {
        type: String,
        match: /^(\+380\d{9})$/,
        minLength: 9,
        maxlength: 13,
        required: true,
      },
      location: String,
      message: String,
    },
    order: {
      type: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
          },
          price: { type: Number, min: 0, required: true },
          order: { type: Number, min: 0, required: true },
          total: {
            type: Number,
          },
        },
      ],
      required: true,
      validate: {
        validator: function (array) {
          return array.length > 0;
        },
        message: 'Массив "order" должен содержать как минимум 1 элемент.',
      },
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    total: {
      type: Number,
    },
  },
  { versionKey: false },
);
