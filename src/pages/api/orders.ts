import dbConnect from '@/util/mongodb';
import OrderModel from '@/models/order.model';
import { NextApiRequest, NextApiResponse } from 'next';

// ----------------------------------------------------------------------

// hacky order function that adds a new database entry every time it's called
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    dbConnect();
    const orders = OrderModel;

    const order = new OrderModel({
      customerName: 'customer',
      customerNumber: 123,
      status: 'new',
      updates: [
        {
          newStatus: 'new',
          user: 'foo',
          timestamp: Date.now(),
        },
      ],
      options: [],
      dish: "custom"
    });

    await order.save();

    const allOrders = await orders.find({});

    res.status(200).json({ orders: allOrders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
