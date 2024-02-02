import { models, model, Schema, Model, InferSchemaType } from 'mongoose';

const DishOptionItemSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  // name that should be displayed in the UI
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
    // as in "2 shots" etc.
    type: Boolean,
    required: true,
    default: false,
  },
  // if any of these are out-of-stock, we mark it out of stock
  dependencies: {
    type: [
      {
        type: String,
        ref: 'Ingredient',
      },
    ],
  },
});

export type DishOptionItem = InferSchemaType<typeof DishOptionItemSchema>;

const DishOptionGroupSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  // name that should be displayed in the UI
  friendlyName: {
    type: String,
    required: true,
  },
  allowMultipleSelections: {
    // e.g. syrup flavors
    type: Boolean,
    required: true,
  },
  allowNoSelection: {
    // e.g. optional toppings, or removals ('NO beans')
    type: Boolean,
    required: true,
  },
  options: [DishOptionItemSchema],
  // if any of these are out-of-stock, we mark it out of stock
  dependencies: {
    type: [
      {
        type: String,
        ref: 'Ingredient',
      },
    ],
  },
});

export type DishOptionGroup = InferSchemaType<typeof DishOptionGroupSchema>;

const DishSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    // name that should be displayed in the UI
    friendlyName: {
      type: String,
      required: true,
    },
    dotw: {
      type: [String],
      required: false,
    },
    basePrice: {
      type: Number,
      required: true,
    },
    tags: {
      type: [String],
      requried: true,
    },
    selectedOptions: {
      type: [String],
      requried: false,
    },
    categories: {
      // e.g. food, drink, special
      type: [String],
      required: true,
    },
    isOrderable: {
      // is displayed on point-of-sale
      type: Boolean,
      required: true,
      default: true,
    },
    isArchived: {
      // is displayed in admin screen's dish management page
      type: Boolean,
      required: true,
      default: false,
    },
    options: [DishOptionGroupSchema],
    // if any of these are out-of-stock, we mark it out of stock
    dependencies: {
      type: [
        {
          type: String,
          ref: 'Ingredient',
        },
      ],
    },
  },
  {
    timestamps: true, // see https://masteringjs.io/tutorials/mongoose/timestamps
    query: {
      byOrderable(isOrderable: boolean) {
        return this.where('isOrderable').equals(isOrderable);
      },
      byFriendlyName(friendlyName: string) {
        return this.where('friendlyName').equals(friendlyName);
      },
      byDotw(dotw: string[]) {
        return this.where('dotw').in(dotw);
      },
      byTags(tags: string[]) {
        return this.where('tags').in(tags);
      },
      bySelectedOptions(selectedOptions: string[]) {
        return this.where('selectedOptions').in(selectedOptions);
      },
      byCategories(categories: string[]) {
        return this.where('categories').in(categories);
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

export type Dish = InferSchemaType<typeof DishSchema>;

// absolutely disgusting typescript wizardry to make it so that mongoose query functions
// show up properly. Some types aren't exposed properly so we define a wrapper class that
// will quasi-expose them. See https://stackoverflow.com/a/64919133/13644774.
// I don't entirely understand this either
class ModelWrapper<T extends Schema> {
  wrapped(s: string, e: T) {
    return model<T>(s, e);
  }
}

type DishModelType = ReturnType<ModelWrapper<typeof DishSchema>['wrapped']>;

const DishModel: DishModelType = (models.Dish as DishModelType) || model('Dish', DishSchema);

export default DishModel;
