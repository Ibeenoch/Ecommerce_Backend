import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'
import json from './json.serialised';
dotenv.config();

const prisma = new PrismaClient;

const generateToken = (id: any) => {
    return jwt.sign({id}, process.env.JWTTOKEN as string, { expiresIn: '2d'}) 
}

export const register = async(req: Request, res: Response) => {
try {
    const { fullname, email, password, confirmPassword, passcode } = req.body;
    console.log(req.body, fullname, email, password, confirmPassword, passcode)
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

   

    if(passcode !== null && passcode === process.env.PASSCODE){
         const newuser = await prisma.user.create({
        data: {
            fullName: fullname,
            email,
            password: hashPassword,
            role: 'ADMIN'
        }
    })
   const token = generateToken(newuser.id)

    console.log(newuser)
    const user = {...newuser, token}
    
    res.status(201).json(user)

    }else{

        // create a user
        const newuser = await prisma.user.create({
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

        const link= `http://localhost:3000/verify/email/${newuser.id}`
        
        const mailOptions = {
            from: 'fredenoch1@gmail.com',
            to: email,
            subject: 'Confirmation Email',
            html: `<h2>Thank You for Joining Maven Store </h2>
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
                  console.log(newuser)
                  const token = generateToken(newuser.id)
                  const user = {...newuser, token}
                res.status(201).json(user)
            }
        })
      
    }

} catch (error) {
    console.log(error)
    res.status(500).json({message: error})
}
}


export const login = async(req: Request, res: Response) => {
    try {
        const { email, password,  passcode } = req.body;
        console.log(req.body)
        //check if the user exist
        const userExist = await prisma.user.findUnique({
            where: {
                email: req.body.email
            }
        })

        if(!userExist){
            res.status(400).json({ message: 'user does not exist'})
        }
    
        if(userExist){
                // verfy password 
            const confirmPassword = await bcrypt.compare(password, userExist.password);
            if(!confirmPassword){
                res.status(400).json({ message: 'password does not match!'})
            }else{
                const token = generateToken(userExist.id);
                const user = {...userExist, token}
                console.log('user: ', user)
                res.status(200).json(user)
            }
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error})
    }
}


export const sendRecoveryPasswordLink = async(req: Request, res: Response) => {
    try {
        const { email } = req.body;

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

        const link= `http://localhost:3000/password/change/${email}`
        
        const mailOptions = {
            from: 'fredenoch1@gmail.com',
            to: email,
            subject: 'Confirmation Email',
            html: `
            <p>To Recovery Your Account in Maven Store, Please Change Your Password </p>
            <p>Click the Link Below to continue to change the password </p>
            ${link}
            `
        }

        transporter.sendMail(mailOptions, async(error, info) => {
            if(error){
                console.log(error)
            }else{
                res.status(200).json({message: 'password recovery sent'})
                console.log(info.response)
            }
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error})
    }
}

export const changePassword = async(req: Request, res: Response) => {
    try {
        const { oldpassword, newpassword1, newpassword2, email } = req.body;
console.log('email confirm: ', req.body, oldpassword, newpassword1, newpassword2, email)
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        const saltRound = 10;
        const salt = bcrypt.genSaltSync(saltRound)
        const hashPassword = await bcrypt.hash(newpassword1, salt);
        

        if(user){
            const token = generateToken(user.id)
            user.password = hashPassword;
            console.log('user that password change: ', user)
            res.status(200).json({...user, token})
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error})
    }
}

export const verifyEmail = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if(id){
            const verified = await prisma.user.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    isVerified: true
                }
            })

            res.status(200).json({ message: 'user is verified', verified})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error})
    }
}


export const checkOutInfo = async(req: Request, res: Response) => {
    try {
        console.log(req.body)
        const user = await prisma.user.update({
            where: {
                id: parseInt(req.body.id)
            },
            data: {
                fullName: req.body.fullName,
                phone: BigInt(parseInt(req.body.phone)),
                address: req.body.street,
                city: req.body.city,
                country: req.body.country,
                state: req.body.state,
                zipcode: parseInt(req.body.zipcode),
            }
        })

        res.status(200).type("json").send(json(user));
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error})        
    }
}