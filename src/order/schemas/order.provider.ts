import { Mongoose } from 'mongoose';
import { OrderSchema } from './order.schema';

export const ordersProviders = [
  {
    provide: 'ORDER_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('Order', OrderSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
