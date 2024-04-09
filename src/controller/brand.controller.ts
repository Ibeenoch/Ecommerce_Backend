import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient()
export const getAllBrands = async(req: Request, res: Response): Promise<void> => {
    try {
        const brands = await prisma.brand.findMany();
        console.log('backend brands ', brands)
        res.status(200).json(brands)
    } catch (error) {
        console.log(error)
    }
}
export const getProductByBrand = async(req: Request, res: Response): Promise<void> => {
    try {
        const category = await prisma.brand.findUnique({
            where: {
                name: req.params.name
            },
            include: {
                products: true
            }
        });
        console.log('backend brand: ', category)
        res.status(200).json(category)
    } catch (error) {
        console.log(error)
    }
}
