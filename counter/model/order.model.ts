import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
    productDetails: Schema.Types.Mixed,
    shippingDetails: Schema.Types.Mixed,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['PENDING', 'SHIPPED', 'DELIVERED', 'DECLINED'], default: 'PENDING' },
    payment: [{ type: Schema.Types.ObjectId, ref: 'Payment' }],
    refunds: [{ type: Schema.Types.ObjectId, ref: 'Refund' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  export const Order = mongoose.model('Order', orderSchema) 