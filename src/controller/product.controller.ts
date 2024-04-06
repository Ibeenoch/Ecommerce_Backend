import express, { Request, Response } from "express";
import { imageUploader } from "../middleware/cloudinary";
import fs from "fs";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createProduct = async (req: Request, res: Response) => {
  try {
    const allImages = JSON.parse(JSON.stringify(req.files));

    const { brand, category } = req.body;

    let urls = [];
    for (let file of allImages) {
      const { path } = file;
      const newFilePath = await imageUploader(path);
      urls.push(newFilePath);
    }

    const imgs = JSON.parse(JSON.stringify(urls));
    const firstImage = {
      url: imgs[0].url,
      public_id: imgs[0].public_id,
    };

    const productcreated = await prisma.product.create({
      data: {
        title: req.body.title,
        description: req.body.description,
        price: parseInt(req.body.price),
        discountPercentage: parseInt(req.body.discountPercentage),
        stock: parseInt(req.body.stock),
        brand: {
          connectOrCreate: {
            where: {
              name: brand,
            },
            create: {
              name: brand,
            },
          },
        },
        category: {
          connectOrCreate: {
            where: {
              name: category,
            },
            create: {
              name: category,
            },
          },
        },
        thumbnail: firstImage,
        keywords: req.body.keywords,
        images: {
          set: imgs.map((image: any) => ({
            url: image.url,
            id: image.public_id,
          })),
        },
      },
      include: {
        brand: true,
        category: true,
      },
    } as any);

    console.log("newProduct:  ", productcreated);
    res.status(201).json(productcreated);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
   if(req.files){
    console.log("req.body: ", req.file, req.files, req.body);
    const allImages = JSON.parse(JSON.stringify(req.files));

    const { brand, category } = req.body;

    let urls = [];
    for (let file of allImages) {
      const { path } = file;
      const newFilePath = await imageUploader(path);
      urls.push(newFilePath);
    }

    const imgs = JSON.parse(JSON.stringify(urls));
    console.log(imgs);
    const firstImage = {
      url: imgs[0].url,
      public_id: imgs[0].public_id,
    };

    const findProduct = await prisma.product.findUnique({
      where: {
        id: parseInt(req.params.id)
      }
    });

    const updateproduct = await prisma.product.update({
      where: {
        id: parseInt(req.params.id),
      }, 
      data: {
        title: req.body.title || findProduct?.title,
        description: req.body.description || findProduct?.description,
        stock: parseInt(req.body.stock) || findProduct?.stock,
        price: parseInt(req.body.price) || findProduct?.price,
        discountPercentage: req.body.discountPercentage || findProduct?.discountPercentage,
        thumbnail: firstImage || findProduct?.thumbnail,
        keywords: req.body.keywords || findProduct?.keywords,
        images: {
          set: imgs.map((image: any) => ({
            url: image.url,
            id: image.public_id,
          })),
        },
      }
    });

    console.log("updatedProduct:  ", updateProduct);
    res.status(200).json(updateProduct);
   }else{
    console.log("req.body: ", req.body);

    const { brand, category } = req.body;

    const findProduct = await prisma.product.findUnique({
      where: {
        id: parseInt(req.params.id)
      }
    });

    const updateproduct = await prisma.product.update({
      where: {
        id: parseInt(req.params.id),
      }, 
      data: {
        title: req.body.title || findProduct?.title,
        description: req.body.description || findProduct?.description,  // String @db.LongText()
        stock: parseInt(req.body.stock) || findProduct?.stock,
        price: parseInt(req.body.price) || findProduct?.price,
        discountPercentage: parseInt(req.body.discountPercentage) || findProduct?.discountPercentage,
        keywords: req.body.keywords || findProduct?.keywords,
       
      }
    });

    console.log("updatedProduct:  ", updateProduct);
    res.status(200).json(updateProduct);

   }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {

    const productDeleted = await prisma.product.delete({
      where: {
        id: parseInt(req.params.id)
      }
    })
    console.log("product deleted:  ", productDeleted);
    res.status(201).json(productDeleted);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const getAllProduct = async (req: Request, res: Response) => {
  try {
    const product = await prisma.product.findMany();
    console.log("all product fetched ", product);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
  }
};

export const getAProduct = async (req: Request, res: Response) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(req.params.id)
      }
    })
    console.log("all product fetched ", product);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
  }
};
