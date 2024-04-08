import dbConnect from '@/app/lib/mongodb';
//import * as mongoose from 'mongoose'; //for Schema and model
import OrderModel from '@/models/order.model';

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { parseQuery, parseBody } from '../parseQuery';

const orderQuerySchema = z.object({
  status: z.enum(['new', 'in_progress', 'completed']).optional(),
  hidden: z.boolean().optional(),
  customerName: z.string().optional(),
  createdBefore: z.coerce.date().optional(),
  createdAfter: z.coerce.date().optional(),
  updatedBefore: z.coerce.date().optional(),
  updatedAfter: z.coerce.date().optional(),
});

/*
dishes: [
      {
        _id: 'italian-soda',
        friendlyName: 'Italian Soda',
        price: 5,
        options: [
          {
            _id: 'sour-cream',
            friendlyName: 'Sour Cream',
            extraPrice: 0,
            allowQuantity: false,
            dependencies: [],
          },
        ],
      },

*/

//Status and customer number get added by the server, no need to have in schema -dcrepublic
const newOrderSchema = z.object({
  customerName: z.string(), //not optional
  total: z.number(),
  //status also initialized to new
  hidden: z.boolean().optional(),
  notes: z.string().optional(),
  dishes: z.array(
    z.object({
      _id: z.string(),
      price: z.number(),
      friendlyName: z.string(),
      tag: z.string(),
      options: z.array(
        z.object({
          //ITEM SCHEMA
          _id: z.string(),
          friendlyName: z.string(),
          extraPrice: z.number(),
          allowQuantity: z.boolean(),
        }),
      ),
    }),
  ),
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
  if (data.hidden) {
    query = query.byHidden(data.hidden);
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
  const { ok, data } = await parseBody(newOrderSchema, request);

  if (!ok) {
    return new NextResponse(data, { status: 400 });
  }

  await dbConnect();

  //assign unique ID, just going up
  // const currentCustomerNumber = getNextCustomerNumber();
  // let currentCustomerNumber2;

  const currentCustomerNumberSearch = await OrderModel.find({})
    .sort({ customerNumber: -1 })
    .limit(1)
    .exec();

  // if (currentCustomerNumberSearch.length == 0) {
  //   currentCustomerNumber2 = null; // no orders yet
  // }

  const currentCustomerNumber = currentCustomerNumberSearch[0]?.customerNumber + 1 || 1;
  console.log(currentCustomerNumber);

  //double check that 1) the dish exists, and 2) isOrderable

  const augmentedData = {
    ...data,
    customerNumber: currentCustomerNumber,
    status: 'in_progress',
  };

  /* To many checks in my opinion -dcrepublic
  const dishValid = await DishModel.findById(augmentedData.dish);

  if (!dishValid) {
    return new NextResponse('Dish not found', { status: 404 });
  }

  if (!dishValid.isOrderable) {
    return new NextResponse('Dish is not available, at this time', { status: 400 });
  }*/

  const newOrder = new OrderModel(augmentedData);
  const savedOrder = await newOrder.save();

  return NextResponse.json({
    order: savedOrder,
  });
}

/* OLD SCHEMA SILLY 1 ITEM PER ORDER WHY?
const newOrderSchema = z.object({
  customerName: z.string(), //not optional
  dish: z.string(),
  options: z.array(
    z.object({
      //ITEM SCHEMA
      _id: z.string(),
      friendlyName: z.string(),
      extraPrice: z.number(),
      allowQuantity: z.boolean(),
      dependencies: z.array(z.string()), //empty array for now
    }),
  ),
  price: z.number(),
  hidden: z.boolean().optional(),
  notes: z.string().optional(),
});

*/
