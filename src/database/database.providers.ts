/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        'mongodb+srv://admin:admin@cluster0.mjp2uiy.mongodb.net/cypa?retryWrites=true&w=majority',
      ),
  },
];
