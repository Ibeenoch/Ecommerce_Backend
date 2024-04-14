import { PrismaClient } from "@prisma/client"
import { json } from "body-parser"
import { Request, Response } from "express"
const prisma = new PrismaClient()

export const getAllOrder = async(req: Request, res: Response) => {
    try {
        const orders = await prisma.order.findMany({
            include: {
                payment: true,
            }
        })

        res.status(200).json(orders)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error})    
    }
}

export const updateOrder = async(req: Request, res: Response) => {
    try {
        const orders = await prisma.order.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: {
                status: req.body.status
            },
            include: {
                payment: true,
            }
        })

        res.status(200).json(orders)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error})    
    }
}