import { models, model, Schema, Model, InferSchemaType } from 'mongoose';

const OrderUpdateSchema = new Schema(
  {
    timestamp: {
      type: Date,
      required: true,
    },
    newStatus: {
      type: String,
      enum: ['new', 'in_progress', 'completed'],
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export type OrderUpdate = InferSchemaType<typeof OrderUpdateSchema>;

const CustomDishOptionsSchema = new Schema({
  friendlyName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

export type CustomDishOptions = InferSchemaType<typeof CustomDishOptionsSchema>;

const OrderSchema = new Schema(
  {
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
      enum: ['new', 'in_progress', 'completed'],
      required: true,
    },
    dish: {
      // see https://mongoosejs.com/docs/populate.html
      // see https://mongoosejs.com/docs/typescript/populate.html
      type: String, // should be the ID of a dish, or 'custom' which will be a reserved word
      ref: 'Dish',
      required: true,
    },
    // map customization ID to an array of one or more customization option IDs
    // for multi-quantity options just repeat the ID a couple times
    options: {
      type: Map,
      of: [String],
      required: true,
    },
    notes: {
      type: String,
      required: false,
    },
    customDishOptions: {
      type: CustomDishOptionsSchema,
      required: false,
    },
    updates: [OrderUpdateSchema],
  },
  {
    timestamps: true, // see https://masteringjs.io/tutorials/mongoose/timestamps
  },
);

export type Order = InferSchemaType<typeof OrderSchema>;

const OrderModel = (models.Order as Model<Order>) || model<Order>('Order', OrderSchema);

export default OrderModel;
