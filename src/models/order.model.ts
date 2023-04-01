import { models, model, Schema, Model } from 'mongoose';

export enum Status {
    New = "new",
    InProgress = "in_progress",
    Completed = "completed"
}

export interface Order {
  orderedTime: Date,
  customerName: String,
  customerNumber: number,
  updates: [
    {
      timestamp: Date,
      newStatus: Status,
      user: String
    }
  ]
}

const OrderSchema: Schema = new Schema({
  orderedTime: {
    type: Date,
    required: true
  },
  customerName: {
    type: String,
    required: true,
  },
  customerNumber: {
    type: Number,
    required: true,
  },
  updates: {
    type: [{
        timestamp: {
            type: Date,
            required: true
        },
        newStatus: {
            type: String,
            enum: Object.values(Status),
            required: true
        },
        user: {
            type: String,
            required: true
        }
    }],
    required: true
  }
});


const OrderModel = (models.Order as Model<Order>) || model<Order>('Order', OrderSchema);


export default OrderModel