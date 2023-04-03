import { models, model, Schema, Model, InferSchemaType } from 'mongoose';

const DishOptionItemSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    // name that should be displayed in the UI
    friendlyName: {
        type: String,
        required: true
    },
    extraPrice: {
        type: Number,
        required: true,
        default: 0
    },
    allowQuantity: { // as in "2 shots" etc.
        type: Boolean,
        required: true,
        default: false,
    },
    // if any of these are out-of-stock, we mark it out of stock
    dependencies: {
        type: [{
            type: String,
            ref: 'Ingredient'
        }],
    }
})

export type DishOptionItem = InferSchemaType<typeof DishOptionItemSchema>;

const DishOptionGroupSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    // name that should be displayed in the UI
    friendlyName: {
        type: String,
        required: true
    },
    allowMultipleSelections: { // e.g. syrup flavors
        type: Boolean,
        required: true
    },
    allowNoSelection: { // e.g. optional toppings, or removals ('NO beans')
        type: Boolean,
        required: true
    },
    options: [DishOptionItemSchema],
    // if any of these are out-of-stock, we mark it out of stock
    dependencies: {
        type: [{
            type: String,
            ref: 'Ingredient'
        }]
    }
})

export type DishOptionGroup = InferSchemaType<typeof DishOptionGroupSchema>;


const DishSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    // name that should be displayed in the UI
    friendlyName: {
        type: String,
        required: true
    },
    basePrice: {
        type: Number,
        required: true
    },
    options: [DishOptionGroupSchema],
    // if any of these are out-of-stock, we mark it out of stock
    dependencies: {
        type: [{
            type: String,
            ref: 'Ingredient'
        }]
    }
},
    {
        timestamps: true // see https://masteringjs.io/tutorials/mongoose/timestamps
    });

export type Dish = InferSchemaType<typeof DishSchema>;

const DishModel = (models.Order as Model<Dish>) || model<Dish>('Dish', DishSchema);

export default DishModel