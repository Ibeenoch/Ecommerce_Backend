import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const protect = async(req: Request, res: Response, next: NextFunction) => {
    console.log('req ', req.headers)
    let token;
    try {
       token  = req.headers && req.headers.authorization && req.headers.authorization.split(' ')[1]
        if(token){
            const decode = jwt.verify(token, process.env.JWTTOKEN as any)as { id: any};
            const reqUser = await prisma.user.findUnique({
                where: {
                    id: parseInt(decode?.id)
                }
            })

            if(!reqUser){
                res.status(401).send('User Unauthorized')
            }else{
                console.log('authorized user: ', )
                next();
            }

        
        }
    } catch (error) {
        console.log(error)
        res.status(409).json({ message: error})
    }
}

console.log('middleware')

export const protectAdmin = async(req: Request, res: Response, next: NextFunction) => {
    console.log(req.headers, req.headers.authorization)
    let token;
    try {
       token  = req.headers && req.headers.authorization && req.headers.authorization.split(' ')[1]
        if(token){
            const decode = jwt.verify(token, process.env.JWTTOKEN as any)as { id: any};
            const reqUser = await prisma.user.findUnique({
                where: {
                    id: parseInt(decode?.id)
                }
            })

            

            if(reqUser?.role !== 'ADMIN'){
                res.status(401).json('User Unauthorized')
            }else{
                console.log('authorized Admin: ')
                next()
            }

        
        }
    } catch (error) {
        console.log(error)
        res.status(409).json({ message: error})
    }
}