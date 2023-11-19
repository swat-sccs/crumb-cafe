import dbConnect from '@/app/lib/mongodb';
//import * as mongoose from 'mongoose'; //for Schema and model
import OrderModel from '@/models/order.model';
import DishModel from '@/models/dish.model';

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { parseQuery, parseBody } from '../parseQuery';
import { getServerSession } from "next-auth/next" 
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

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
  await dbConnect();
  
  const session = await getServerSession(authOptions)

  console.log(session)


  const { ok, data } = parseQuery(orderQuerySchema, request);

  if (!ok) {
    return new NextResponse(data, { status: 400 });
  }


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
  const { ok, data } = parseBody(newOrderSchema, request);

  if (!ok) {
    return new NextResponse(data, { status: 400 });
  }

  await dbConnect();

  let currentCustomerNumber;

  const currentCustomerNumberSearch = await OrderModel.find({})
    .sort({ customerNumber: -1 })
    .limit(1)
    .exec();

  if (currentCustomerNumberSearch.length == 0) {
    currentCustomerNumber = 1; // no orders yet
  } else {
    currentCustomerNumber = currentCustomerNumberSearch[0].customerNumber + 1;
  }

  //double check that 1) the dish exists, and 2) isOrderable

  const augmentedData = {
    ...data,
    customerNumber: currentCustomerNumber,
    status: 'new',
  };

  const dishValid = await DishModel.findById(augmentedData.dish);

  if (!dishValid) {
    return new NextResponse('Dish not found', { status: 404 });
  }

  if (!dishValid.isOrderable) {
    return new NextResponse('Dish is not available, at this time', { status: 400 });
  }

  const newOrder = new OrderModel(augmentedData);
  const savedOrder = await newOrder.save();

  return NextResponse.json({
    order: savedOrder,
  });
}
