import dbConnect from '@/util/mongodb';
import OrderModel, { Status } from '@/models/order.model';
import { NextApiRequest, NextApiResponse } from 'next';

// ----------------------------------------------------------------------

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    dbConnect();
    const orders = OrderModel;

    const order = new OrderModel({
      customerName: "customer",
      customerNumber: 123,
      orderedTime: Date.now(),
      updates: [{
        newStatus: Status.New,
        user: "foo",
        timestamp: Date.now(),
      }]
    })
    await order.save();
    
    const allOrders = await orders.find({});

    res.status(200).json({ orders: allOrders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}