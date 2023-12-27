import dbConnect from '@/app/lib/mongodb';
import OrderModel from '@/models/order.model';
import { NextRequest, NextResponse } from 'next/server';

// disable revalidation; clients will handle their own caching
export const revalidate = 0;

export async function GET(_request: NextRequest, { params }: { params: { orderId: string } }) {
  await dbConnect();

  try {
    const order = await OrderModel.findById(params.orderId);
    if (order) {
      return NextResponse.json(order);
    } else {
      return new NextResponse('Order not found', { status: 404 });
    }
  } catch (e) {
    // probably a cast error because an invalid ID was supplied
    return new NextResponse('Order not found', { status: 404 });
  }
}

export async function POST(_request: NextRequest) {
  await dbConnect();

  try {
    const order = _request.json();
    await OrderModel.create(order);
    return new NextResponse('Order created successfully', { status: 201 });
  } catch (e) {
    return new NextResponse('Poor request', { status: 400 });
  }
}

export async function PUT(_request: NextRequest, { params }: { params: { orderId: string } }) {
  await dbConnect();

  try {
    const order = _request.json();
    const updatedOrder = await OrderModel.findByIdAndUpdate(params.orderId, order, { new: true });

    if (!updatedOrder) {
      return new NextResponse('Order not found', { status: 404 });
    }
    return new NextResponse('Order updated successfully', { status: 200 });
  } catch (e) {
    return new NextResponse('Unable to update order', { status: 404 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: { orderId: string } }) {
  await dbConnect();

  try {
    const order = await OrderModel.findByIdAndDelete(params.orderId);
    if (order) {
      return NextResponse.json(order);
    } else {
      return new NextResponse('Order not found', { status: 404 });
    }
  } catch (e) {
    // probably a cast error because an invalid ID was supplied
    return new NextResponse('Order not found', { status: 404 });
  }
}
