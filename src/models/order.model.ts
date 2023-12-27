import { models, model, Schema, InferSchemaType } from 'mongoose';

const Counter2 = new Schema({ id: Number });
export type Counter = InferSchemaType<typeof Counter2>;

const OrderUpdateSchema = new Schema(
  {
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

const OptionsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
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
    hidden: {
      type: Boolean,
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
      required: false,
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
    query: {
      byCustomerName(customerName: string) {
        return this.where('customerName').equals(customerName);
      },
      byStatus(status: string) {
        return this.where('status').equals(status);
      },
      byHidden(hidden: boolean) {
        return this.where('hidden').equals(hidden);
      },
      createdBefore(timestamp: Date) {
        return this.lt('createdAt', timestamp);
      },
      createdAfter(timestamp: Date) {
        return this.gt('createdAt', timestamp);
      },
      updatedBefore(timestamp: Date) {
        return this.lt('updatedAt', timestamp);
      },
      updatedAfter(timestamp: Date) {
        return this.gt('updatedAt', timestamp);
      },
    },
  },
);

export type Order = InferSchemaType<typeof OrderSchema>;

// absolutely disgusting typescript wizardry to make it so that mongoose query functions
// show up properly. Some types aren't exposed properly so we define a wrapper class that
// will quasi-expose them. See https://stackoverflow.com/a/64919133/13644774.
// I don't entirely understand this either
class ModelWrapper<T extends Schema> {
  wrapped(s: string, e: T) {
    return model<T>(s, e);
  }
}

type OrderModelType = ReturnType<ModelWrapper<typeof OrderSchema>['wrapped']>;

const OrderModel: OrderModelType = (models.Order as OrderModelType) || model('Order', OrderSchema);

export default OrderModel;
