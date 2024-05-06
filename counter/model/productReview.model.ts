import mongoose, { Schema } from "mongoose";

const productReviewSchema = new Schema({
    remark: String,
    rating: Number,
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  export const ProductReview = mongoose.model('ProductReview', productReviewSchema) 