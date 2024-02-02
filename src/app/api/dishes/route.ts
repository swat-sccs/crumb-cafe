import dbConnect from '@/app/lib/mongodb';
import DishModel from '@/models/dish.model';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { parseQuery, parseBody } from '../parseQuery';

const dishQuerySchema = z.object({
  isOrderable: z.boolean().optional(),
  friendlyName: z.string().optional(),
  dotw: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  selectedOptions: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),
  createdBefore: z.coerce.date().optional(),
  createdAfter: z.coerce.date().optional(),
  updatedBefore: z.coerce.date().optional(),
  updatedAfter: z.coerce.date().optional(),
});

const newDishSchema = z.object({
  _id: z.string(),
  friendlyName: z.string(),
  basePrice: z.number(),
  dotw: z.array(z.string()),
  tags: z.array(z.string()),
  selectedOptions: z.array(z.string()),
  categories: z.array(z.string()),
  isOrderable: z.boolean(),
  isArchived: z.boolean(),
  options: z.object({
    //dish GROUP SCHEMA
    _id: z.string(),
    friendlyName: z.string(),
    allowMultipleSelections: z.boolean(),
    allowNoSelection: z.boolean(),
    allowQuantity: z.boolean(),
    options: z.object({
      //ITEM SCHEMA
      _id: z.string(),
      friendlyName: z.string(),
      extraPrice: z.number(),
      allowQuantity: z.boolean(),
      dependencies: z.array(z.string()), //empty array for now
    }),
    dependencies: z.array(z.string()), //empty array
  }),
  dependencies: z.array(z.string()), //empty array
});

export async function GET(request: NextRequest) {
  const { ok, data } = parseQuery(dishQuerySchema, request);

  if (!ok) {
    return new NextResponse(data, { status: 400 });
  }

  await dbConnect();

  let query = DishModel.find();

  if (data.isOrderable) {
    query = query.byOrderable(data.isOrderable);
  }

  if (data.friendlyName) {
    query = query.byFriendlyName(data.friendlyName);
  }
  if (data.dotw) {
    query = query.byDotw(data.dotw);
  }

  if (data.tags) {
    query = query.byTags(data.tags);
  }
  if (data.selectedOptions) {
    query = query.bySelectedOptions(data.selectedOptions);
  }
  if (data.categories) {
    query = query.byCategories(data.categories);
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
    dishes: res,
  });
}

export async function POST(request: NextRequest) {
  const { ok, data } = parseQuery(newDishSchema, request);
  //const { data } = parseBody(newDishSchema, request);

  if (!ok) {
    return new NextResponse(data, { status: 400 });
  }

  await dbConnect();

  //Broken for now will come back to fix

  //some logic i guess, if dish already exists?? no need to post again
  const dishCopy = await DishModel.findById(data._id);

  if (dishCopy) {
    return new NextResponse('Dish already exists', { status: 208 });
  }

  //end of logic

  const newOrder = new DishModel(data);
  const savedOrder = await newOrder.save();

  return NextResponse.json({
    order: savedOrder,
  });
}
