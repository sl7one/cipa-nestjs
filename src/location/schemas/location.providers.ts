/* eslint-disable prettier/prettier */
import { Connection } from 'mongoose';
import { LocationSchema } from './location.schema';

export const locationsProviders = [
  {
    provide: 'LOCATION_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Location', LocationSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
