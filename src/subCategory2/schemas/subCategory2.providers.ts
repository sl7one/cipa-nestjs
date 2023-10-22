/* eslint-disable prettier/prettier */
import { Connection } from 'mongoose';
import { SubCategory2Schema } from './subCategory2.schema';

export const subCategory2Providers = [
  {
    provide: 'SUBCATEGORY2_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('SubCategory2', SubCategory2Schema),
    inject: ['DATABASE_CONNECTION'],
  },
];
