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

const DishOptionItemSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  friendlyName: {
    type: String,
    required: true,
  },
  extraPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  allowQuantity: {
    type: Boolean,
    required: true,
    default: true,
  },
});

export type DishOptionItem = InferSchemaType<typeof DishOptionItemSchema>;

const DishesListSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  friendlyName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  tag: {
    type: String,
    required: true,
  },
  options: [DishOptionItemSchema],
});

export type DishListItem = InferSchemaType<typeof DishesListSchema>;

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
    total: {
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
    dishes: [DishesListSchema],
    notes: {
      type: String,
      required: false,
    },

    //updates: [OrderUpdateSchema], //OLD WHY HERE?
  },
  // see https://masteringjs.io/tutorials/mongoose/timestamps
  {
    timestamps: true,
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
