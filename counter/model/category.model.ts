import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
    name: { type: String, unique: true },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
  });
  

  export const Category = mongoose.model('Category', categorySchema) 