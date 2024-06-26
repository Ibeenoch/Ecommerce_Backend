import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient()
export const getAllCategories = async(req: Request, res: Response): Promise<void> => {
    try {
        const categories = await prisma.category.findMany();
        console.log('backend categries ', categories)
        res.status(200).json(categories)
    } catch (error) {
        console.log(error)
    }
}
export const getProductByCategory = async(req: Request, res: Response): Promise<void> => {
    try {
        const category = await prisma.category.findUnique({
            where: {
                name: req.params.name
            },
            include: {
                products: true
            }
        });
        console.log('backend category ', category)
        res.status(200).json(category)
    } catch (error) {
        console.log(error)
    }
}
