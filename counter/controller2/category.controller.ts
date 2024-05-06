import mongoose from "mongoose";
import { Request, Response } from "express";
import { Category } from "../model/category.model";

export const getAllCategories = async(req: Request, res: Response): Promise<void> => {
    try {
        const categories = await Category.find();
        console.log('backend categries ', categories)
        res.status(200).json(categories)
    } catch (error) {
        console.log(error)
    }
}
export const getProductByCategory = async(req: Request, res: Response): Promise<void> => {
    try {
        const category = await Category.findOne({ name: req.params.name}).populate('products')
        console.log('backend category ', category)
        res.status(200).json(category)
    } catch (error) {
        console.log(error)
    }
}
