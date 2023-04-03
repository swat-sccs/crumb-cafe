import { models, model, Schema, Model, InferSchemaType } from 'mongoose';

// super basic to start, for now these are basically just flags that will
// disable lots of different stuff if they get marked out-of-stock
const IngredientSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    friendlyName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export type Ingredient = InferSchemaType<typeof IngredientSchema>;

const IngredientModel =
  (models.Order as Model<Ingredient>) || model<Ingredient>('Ingredient', IngredientSchema);

export default IngredientModel;
