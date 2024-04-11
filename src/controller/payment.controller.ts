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

// const details= {
    
// amount: 3060
// charge_response_code : "00"
// charge_response_message : "Please enter the OTP sent to your mobile number 080****** and email te**@rave**.com"
// charged_amount : 3060
// created_at : "2024-04-10T16:14:17.000Z"
// currency : "NGN"
// customer : {name: 'ibewunjo enoch', email: 'fredenoch1@gmail.com', phone_number: '7013456692'}
// flw_ref : "FLW-MOCK-9e826977e2404c3f0181648af2510d18"
// redirectstatus : undefined
// status : "successful"
// transaction_id : 5017067
// tx_ref : "mx-1712764796787"
// }