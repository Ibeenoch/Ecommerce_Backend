import mongoose from "mongoose";
import { Request, Response } from "express";
import { Brand } from "../model/brand.model";

export const getAllBrands = async(req: Request, res: Response): Promise<void> => {
    try {
        const brands = await Brand.find();
        console.log('backend brands ', brands)
        res.status(200).json(brands)
    } catch (error) {
        console.log(error)
    }
}
export const getProductByBrand = async(req: Request, res: Response): Promise<void> => {
    try {
        const brand = await Brand.findOne({ name: req.params.name }).populate('products');

        console.log('backend brand: ', brand)
        res.status(200).json(brand)
    } catch (error) {
        console.log(error)
    }
}
