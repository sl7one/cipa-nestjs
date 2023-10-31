import { Connection } from 'mongoose';
import { Sub2CategorySchema } from './sub2Category.schema';

export const sub2CategoryProviders = [
  {
    provide: 'SUB2CATEGORY_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Sub2Category', Sub2CategorySchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
