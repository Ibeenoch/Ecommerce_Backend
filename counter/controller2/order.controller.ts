import mongoose from "mongoose"
import { Request, Response } from "express"
import { Order } from "../model/order.model"

export const getAllOrder = async(req: Request, res: Response): Promise<void> => {
    try {
        const orders = await Order.find().populate('payment')
console.log('order send ', orders)
        res.status(200).json(orders)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error})    
    }
}

export const updateOrder = async(req: Request, res: Response): Promise<void> => {
    try {
        console.log('received ')
 
        const orders = Order.findByIdAndUpdate( {_id: req.params.id}, req.body.status, { new: true }).populate('payment')

        console.log('result update', orders )

        res.status(200).json(orders)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error})    
    }
}

export const deleteOrder = async(req: Request, res: Response): Promise<void> => {
    try {
        console.log('delete')
        console.log(req.params)
  
        const orders = await Order.findByIdAndDelete({_id: req.params.id});

        console.log('result delete', orders)

        res.status(200).json(orders)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error})    
    }
}

export const paginateOrders = async (req: Request, res: Response): Promise<void> => {
    try {
      const { limit, currentPage } = req.body;
      const pageSize = parseInt(limit);
      const pageNumber = parseInt(currentPage);
      const skip = (pageNumber - 1 ) * pageSize;
     const paginatedResult = await Order.find()
      .skip(skip)
      .limit(pageSize)
      .populate('payment');

      res.status(200).json(paginatedResult);
    } catch (error) {
      console.log(error);
    }
  };