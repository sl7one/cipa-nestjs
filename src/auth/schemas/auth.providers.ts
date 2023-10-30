/* eslint-disable prettier/prettier */
import { Connection } from 'mongoose';
import { AuthSchema } from './auth.schema';

export const authProviders = [
  {
    provide: 'USERS_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Users', AuthSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
