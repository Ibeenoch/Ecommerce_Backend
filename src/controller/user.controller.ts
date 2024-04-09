import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
dotenv.config();

const prisma = new PrismaClient;



export const register = async(req: Request, res: Response) => {
try {
    const { fullname, email, password, confirmPassword, passcode } = req.body;
    //check if the user exist
    const userExist = await prisma.user.findUnique({
        where: {
            email: req.body.email
        }
    })

    if(userExist){
        res.status(409).json({ message: 'user already exist'})
    }

    const saltRound = 10;
    const salt =  bcrypt.genSaltSync(saltRound);
    const hashPassword = bcrypt.hashSync(password, salt);

   
    console.log('ppasscoding ',passcode, email, process.env.GOOGLEAPPPASS)     

    if(passcode !== null && passcode === process.env.PASSCODE){
   console.log('masscode ',passcode)     
         const user = await prisma.user.create({
        data: {
            fullName: fullname,
            email,
            password: hashPassword,
            role: 'ADMIN'
        }
    })

    console.log(user)
    
    res.status(201).json(user)

    }else{

        // create a user
        const user = await prisma.user.create({
            data: {
                fullName: fullname,
                email,
                password: hashPassword,
                
            }
        })
        
        

        const transporter = nodemailer.createTransport(({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            logger: true,
            debug: true,
            auth: {
                user: 'fredenoch1@gmail.com',
                pass: process.env.GOOGLEAPPPASS
            },
            tls: {
                rejectUnauthorized: true
            }
        }));

        const link= `http://localhost:3000/verify/email/${user.id}`
        
        const mailOptions = {
            from: 'fredenoch1@gmail.com',
            to: email,
            subject: 'Confirmation Email',
            html: `<h2>Thank You for Joining Us </h2>
            <h3>You Are Almost There! </h3>
            <h3>Let's confirm your email address.</h3>
            <p>By clicking on the link below, you have confirm your email address and agreed to our terms of srevice </p>
            ${link}
            `
        }


        transporter.sendMail(mailOptions, async(error, info) => {
            if(error){
                console.log(error)
            }else{
                console.log(info.response)
                
            }
        })
        
        console.log(user)
        res.status(201).json(user)

       
        
    }

   

    
} catch (error) {
    console.log(error)
    res.status(500).json({message: error})
}
}