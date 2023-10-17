/* eslint-disable prettier/prettier */
import { Mongoose } from 'mongoose';
import { ClientSchema } from './client.schema';

export const clientsProviders = [
  {
    provide: 'CLIENT_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('Client', ClientSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
