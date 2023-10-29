import dbConnect from '@/app/lib/mongodb';
import OrderModel from '@/models/order.model';

import DishModel from '@/models/dish.model';

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { parseQuery } from '../parseQuery';

let customerNumberA = 1;

const orderQuerySchema = z.object({
  status: z.enum(['new', 'in_progress', 'completed']).optional(),
  customerName: z.string().optional(),
  createdBefore: z.coerce.date().optional(),
  createdAfter: z.coerce.date().optional(),
  updatedBefore: z.coerce.date().optional(),
  updatedAfter: z.coerce.date().optional(),
});

const newOrderSchema = z.object({
  customerName: z.string(), //not optional
  dish: z.string(),
  options: z.map(z.string(), z.array(z.string())),
  notes: z.string().optional(),
  customDishOptions: z.object({
    friendlyName: z.string(),
    description: z.string(),
    price: z.number(),
  }),
});

export async function GET(request: NextRequest) {
  const { ok, data } = parseQuery(orderQuerySchema, request);

  if (!ok) {
    return new NextResponse(data, { status: 400 });
  }

  await dbConnect();

  let query = OrderModel.find();

  if (data.status) {
    query = query.byStatus(data.status);
  }

  if (data.customerName) {
    query = query.byCustomerName(data.customerName);
  }

  if (data.createdBefore) {
    query = query.createdBefore(data.createdBefore);
  }

  if (data.createdAfter) {
    query = query.createdAfter(data.createdAfter);
  }

  if (data.updatedBefore) {
    query = query.updatedBefore(data.updatedBefore);
  }

  if (data.updatedAfter) {
    query = query.updatedAfter(data.updatedAfter);
  }

  const res = await query.exec();

  return NextResponse.json({
    orders: res,
  });
}

export async function POST(request: NextRequest) {
  //assign unique ID, just going up
  const currentCustomerNumber = customerNumberA;
  const data = { ...request.json(), status: 'new', customerNumber: currentCustomerNumber };
  customerNumberA = customerNumberA + 1;

  const parsed = newOrderSchema.safeParse(data);

  let parsedData;
  if (parsed.success) {
    parsedData = parsed.data;
  } else {
    return new NextResponse('Poor input', { status: 400 });
  }

  //double check that 1) the dish exists, and 2) isOrderable

  try {
    const dishValid = DishModel.findById(parsedData.dish);
    //if (dishValid.isOrderable) ???
  } catch (e) {
    // probably a cast error because an invalid ID was supplied
    return new NextResponse('Dish not found', { status: 404 });
  }

  await dbConnect();

  const newOrder = new OrderModel(parsedData);
  const savedOrder = await newOrder.save();

  return NextResponse.json({
    order: savedOrder,
  });
}
