import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema({
    paymentDetails: Schema.Types.Mixed,
    status: { type: String, enum: ['PENDING', 'SUCCESSFUL', 'DECLINE'] },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    order: { type: Schema.Types.ObjectId, ref: 'Order' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  export const Payment = mongoose.model('Payment', paymentSchema) 