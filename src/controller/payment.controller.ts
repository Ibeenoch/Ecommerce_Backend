import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import json from './json.serialised'

const prisma = new PrismaClient;


export const makePayment = async(req: Request, res: Response) => {
    try {
        console.log(req.body.user[0].id, req.body.carts)
        const paymentReceived = await prisma.payment.create({
            data: {
                paymentDetails: req.body.response,
                user: {
                    connect: {
                        id: parseInt(req.body.user[0].id)
                    }
                },
               status: 'SUCCESSFUL',
               order: {
                connectOrCreate: {
                    where: {
                        id: parseInt(req.body.user[0].id),
                    },
                    create: {
                        productDetails: req.body.carts,
                        shippingDetails: req.body.shippingDetails,
                        userId: parseInt(req.body.user[0].id),
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

export const getAlltransactionForAuser = async(req: Request, res: Response) => {
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