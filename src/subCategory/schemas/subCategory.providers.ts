import { Connection } from 'mongoose';
import { SubCategorySchema } from './subCategory.schema';

export const subCategoryProviders = [
  {
    provide: 'SUBCATEGORY_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('SubCategory', SubCategorySchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
