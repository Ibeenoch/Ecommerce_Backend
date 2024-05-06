import mongoose, { Schema } from "mongoose";



const productSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    rating: Number,
    stock: Number,
    brand: { type: Schema.Types.ObjectId, ref: 'Brand' },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    thumbnail: Schema.Types.Mixed,
    keywords: String,
    CartItem: [{ type: Schema.Types.ObjectId, ref: 'CartItem' }],
    wishlist: [{ type: Schema.Types.ObjectId, ref: 'WishList' }],
    productReview: [{ type: Schema.Types.ObjectId, ref: 'ProductReview' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    images: [Schema.Types.Mixed]
  });

  export const Product = mongoose.model('Product', productSchema) 