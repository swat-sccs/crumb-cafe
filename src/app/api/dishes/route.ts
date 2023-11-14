import dbConnect from '@/app/lib/mongodb';
import DishModel from '@/models/dish.model';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { parseQuery } from '../parseQuery';

const dishQuerySchema = z.object({
  isOrderable: z.boolean().optional(),
  friendlyName: z.string().optional(),
  tags: z.array(z.string()).optional(),
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
  tags: z.array(z.string()),
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
      //dependicies
    }),
    //dependencies
  }),

  //dependencies:  I do not know, how to set this one up
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

  if (data.tags) {
    query = query.byTags(data.tags);
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
