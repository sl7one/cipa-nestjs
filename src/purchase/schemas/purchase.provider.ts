import { Mongoose } from 'mongoose';
import { PurchaseSchema } from './purchase.schema';

export const purchasesProviders = [
  {
    provide: 'PURCHASE_MODEL',
    useFactory: (mongoose: Mongoose) =>
      mongoose.model('Purchase', PurchaseSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
