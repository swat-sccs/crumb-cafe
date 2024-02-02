import dbConnect from '@/app/lib/mongodb';
import DishModel from '@/models/dish.model';
import { NextRequest, NextResponse } from 'next/server';

// disable revalidation; clients will handle their own caching
export const revalidate = 0;

export async function GET(_request: NextRequest, { params }: { params: { dishId: string } }) {
  await dbConnect();

  try {
    const dish = await DishModel.findById(params.dishId);
    if (dish) {
      return NextResponse.json(dish);
    } else {
      return new NextResponse('Dish not found', { status: 404 });
    }
  } catch (e) {
    // probably a cast error because an invalid ID was supplied
    return new NextResponse('Dish not found', { status: 404 });
  }
}

export async function PUT(_request: NextRequest, { params }: { params: { dishId: string } }) {
  await dbConnect();

  try {
    //const dish = await DishModel.findById(params.dishId);
    const dish = await _request.json();
    const updatedOrder = await DishModel.findByIdAndUpdate(params.dishId, dish, { new: true });

    if (!updatedOrder) {
      return new NextResponse('Dish not found', { status: 404 });
    }
    //return NextResponse.json(order);
    return new NextResponse('Dish updated successfully ', updatedOrder, { status: 200 });
  } catch (e) {
    return new NextResponse('Unable to update Dish', { status: 404 });
  }
}

export async function POST(_request: NextRequest) {
  await dbConnect();

  try {
    const dish = _request.json();
    await DishModel.create(dish);
    return new NextResponse('Dish created successfully', { status: 201 });
  } catch (e) {
    return new NextResponse('Poor request', { status: 400 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: { dishId: string } }) {
  await dbConnect();

  try {
    const dish = await DishModel.findByIdAndDelete(params.dishId);
    if (dish) {
      return NextResponse.json(dish);
    } else {
      return new NextResponse('Dish not found', { status: 404 });
    }
  } catch (e) {
    // probably a cast error because an invalid ID was supplied
    return new NextResponse('Dish not found', { status: 404 });
  }
}
