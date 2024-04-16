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

        console.log('result update', )

        res.status(200).json(orders)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error})    
    }
}

export const deleteOrder = async(req: Request, res: Response) => {
    try {
        console.log('delete')
        console.log(req.params)
        const orders = await prisma.order.delete({
            where: {
                id: parseInt(req.params.id)
            },
            
        })

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
      const paginatedResult = await prisma.order.findMany({
        take: pageSize,
        skip,
        include: {
          payment: true,
        }
      })
      // console.log("all product fetched desc ", sortedAllProduct);
      res.status(200).json(paginatedResult);
    } catch (error) {
      console.log(error);
    }
  };