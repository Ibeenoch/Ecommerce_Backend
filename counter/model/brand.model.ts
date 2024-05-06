import mongoose, { Schema } from "mongoose";

const brandSchema = new Schema({
    name: { type: String, unique: true },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
  });
  

export const Brand = mongoose.model('Brand', brandSchema) 