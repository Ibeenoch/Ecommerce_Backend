import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    fullName: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ['ADMIN', 'USER'], default: 'USER' },
    address: String,
    phone: Number,
    image: Schema.Types.Mixed,
    zipcode: Number,
    state: String,
    country: String,
    city: String,
    Order: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    RecentViewed: [Schema.Types.Mixed],
    isVerified: { type: Boolean, default: false },
    payment: [{ type: Schema.Types.ObjectId, ref: 'Payment' }],
    wishlist: [{ type: Schema.Types.ObjectId, ref: 'WishList' }],
    notification: [{ type: Schema.Types.ObjectId, ref: 'Notification' }],
    productReview: [{ type: Schema.Types.ObjectId, ref: 'ProductReview' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  
  export const UserModel = mongoose.model('UserModel', userSchema) 