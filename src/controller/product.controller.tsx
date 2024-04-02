import express, { Request, Response } from "express";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export const createPost = async(req: Request, res: Response) => {
  try {
    const {
        title,
        description,
        price,
        discountPercentage,
        rating,
        stock,
        brand,
        category,
        thumbnail,
        keywords,
        images,
        CartItem,
        Order,
        wishlist,
        productReview,
    } = req.body

    

    const newProduct = await prisma.product.create({
        data: {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            discountPercentage: req.body.discountPercentage,
            rating: req.body.rating,
            stock: req.body.stock,
            brand: {
                connectOrCreate: brand.map((_brand: any) => {
                    return {
                        where: {
                            name: req.body._brand,
                        },
                        create: {
                            name: req.body._brand,
                        },
                    }
                })
            },
            category: {
                connectOrCreate: category.map((cat: any) => {
                    return {
                        where: {
                            name: req.body.cat
                        },
                        create: {
                            name: req.body.cat
                        },
                    }
                })
            },
            thumbnail: req.body.thumbnail,
            //keywords: req.body.keywords,
            images: {
                connectOrCreate: images.map((image: any) => {
                  return  {
                        where: {
                            name: req.body.image
                        },
                        create: {
                            name: req.body.image
                        }
                    }
                })
            }
        }
    })

  } catch (error) {}
};
