import mongoose from "mongoose"
import { Request, Response } from "express"
import { Payment } from "../model/payment.model";
import { Order } from "../model/order.model";



export const makePayment = async(req: Request, res: Response): Promise<void> => {
    try {
        console.log(req.body.user.id, req.body.carts)
        const { carts, user, shippingDetails, response } = req.body;
          // Create the order document
  const createdOrder = await Order.create({
    productDetails: carts,
    shippingDetails: shippingDetails,
    user: user._id
  });

  // Create the payment document
  const paymentReceived = await Payment.create({
    paymentDetails: response,
    user: user._id, // Assuming user.id is the ObjectId of the user
    status: 'SUCCESSFUL',
    order: createdOrder._id // Assuming Order has a field _id
  });

  // Populate user and order fields in paymentReceived
  await paymentReceived.populate('user order');

 
console.log(paymentReceived)
res.status(201).json(paymentReceived)
        
    } catch (error) {
       console.log(error)
       res.status(500).json({ message: error})
    }
}

export const getAlltransactionForAuser = async(req: Request, res: Response): Promise<void> => {
    try {
        const transactions = await Payment.find({ user: req.params.id }).populate('user order');

        res.status(200).json(transactions)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error})
    }
}

export const getAtransactionOfAuser = async(req: Request, res: Response): Promise<void> => {
    try {
        console.log(req.params)
        const transaction = await Payment.findOne({ _id: req.params.id, user: req.params.userId })
        .populate('user')
        .populate('order');

        res.status(200).json(transaction);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error})
    }
}

export const getAlltransactions = async(req: Request, res: Response): Promise<void> => {
    try {
        const transactions = await Payment.find().populate('user order');
        console.log('transaction: ', transactions)

        res.status(200).json(transactions);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error})
    }
}

export const deletetransaction = async(req: Request, res: Response): Promise<void> => {
    try {
        const transactions = await Payment.findByIdAndDelete({ _id: req.params.id})
         
        res.status(200).json(transactions);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error})
    }
}


export const paginatePayment = async (req: Request, res: Response): Promise<void> => {
    try {
      const { limit, currentPage } = req.body;
      const pageSize = parseInt(limit);
      const pageNumber = parseInt(currentPage);
      const skip = (pageNumber - 1 ) * pageSize;
      const paginatedResult = await Payment.find()
      .skip(skip)
      .limit(pageSize)
      .populate('user order');
      
      res.status(200).json(paginatedResult);
    } catch (error) {
      console.log(error);
    }
  };