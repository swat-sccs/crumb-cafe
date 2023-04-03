import { models, model, Schema, Model, InferSchemaType } from 'mongoose';

export type OrderStatus = "new" | "in_progress" | "completed";

const OrderUpdateSchema = new Schema({
  timestamp: {
    type: Date,
    required: true
  },
  newStatus: {
    type: String,
    enum: ["new", "in_progress", "completed"],
    required: true
  },
  user: {
    type: String,
    required: true
  }
}, { timestamps: true })

export type OrderUpdate = InferSchemaType<typeof OrderUpdateSchema>;

const OrderSchema = new Schema({
  customerName: {
    type: String,
    required: true,
  },
  customerNumber: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["new", "in_progress", "completed"],
    required: true
  },
  updates: {
    type: [OrderUpdateSchema],
    required: true
  }
},
  {
    timestamps: true // see https://masteringjs.io/tutorials/mongoose/timestamps
  });

export type Order = InferSchemaType<typeof OrderSchema>;

const OrderModel = (models.Order as Model<Order>) || model<Order>('Order', OrderSchema);


export default OrderModel