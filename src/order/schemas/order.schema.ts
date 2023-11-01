import * as mongoose from 'mongoose';

const fullOrder = new mongoose.Schema({
  title: { type: String },
  img: { type: String },
  category: { type: String },
  subCategory: { type: String, required: false },
  subCategory2: { type: String, required: false },

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

    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
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
