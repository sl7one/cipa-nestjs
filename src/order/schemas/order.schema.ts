/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    client: {
      _id: { type: mongoose.SchemaTypes.ObjectId, ref: 'Client' },
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
    },
    order: {
      type: [
        {
          product: {
            title: String,
            img: String,
            id: String,
            category: String,
            subCategory: String,
            subCategory2: String,
            _id: mongoose.Schema.Types.ObjectId,
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

    location: { type: String },
    message: { type: String },

    total: {
      type: Number,
    },
  },
  { versionKey: false },
);
