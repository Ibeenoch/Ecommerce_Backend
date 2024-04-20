import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import json from './json.serialised'

const prisma = new PrismaClient;


export const makePayment = async(req: Request, res: Response): Promise<void> => {
    try {
        console.log('reqbody: ', req.body)
        console.log(req.body.user.id, req.body.carts)
        const paymentReceived = await prisma.payment.create({
            data: {
                paymentDetails: req.body.response,
                user: {
                    connect: {
                        id: parseInt(req.body.user.id)
                    }
                },
               status: 'SUCCESSFUL',
               order: {
                connectOrCreate: {
                    where: {
                        id: parseInt(req.body.user.id),
                    },
                    create: {
                        productDetails: req.body.carts,
                        shippingDetails: req.body.shippingDetails,
                        userId: parseInt(req.body.user.id),
                    }
                }
               }

        },
        include: {
            user: true,
            order: true,
        }
    });

console.log(paymentReceived)
res.status(201).type("json").send(json(paymentReceived))
        
    } catch (error) {
       console.log(error)
       res.status(500).json({ message: error})
    }
}

export const getAlltransactionForAuser = async(req: Request, res: Response): Promise<void> => {
    try {
        const transactions = await prisma.payment.findMany({
            where: {
                userId: parseInt(req.params.id)
            },
            include: {
                user: true,
                order: true
            }
        })

        res.status(200).type("json").send(json(transactions))
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error})
    }
}

export const getAtransactionOfAuser = async(req: Request, res: Response): Promise<void> => {
    try {
        console.log(req.params)
        const transaction = await prisma.payment.findUnique({
            where: {
                id: parseInt(req.params.id),
                userId: parseInt(req.params.userId)
            },
            include: {
                user: true,
                order: true
            }
        })

        res.status(200).type("json").send(json(transaction))
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error})
    }
}

export const getAlltransactions = async(req: Request, res: Response): Promise<void> => {
    try {
        const transactions = await prisma.payment.findMany({
            include: {
                user: true,
                order: true
            }
        })
        console.log('transaction: ', transactions)

        res.status(200).type("json").send(json(transactions))
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error})
    }
}

export const deletetransaction = async(req: Request, res: Response): Promise<void> => {
    try {
        const transactions = await prisma.payment.delete({
           where: {
                id: parseInt(req.params.id)
           }
        })

        res.status(200).type("json").send(json(transactions))
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
      const paginatedResult = await prisma.payment.findMany({
        take: pageSize,
        skip,
        include: {
          user: true,
          order: true,
        }
      })
      res.status(200).type("json").send(json(paginatedResult));
    } catch (error) {
      console.log(error);
    }
  };