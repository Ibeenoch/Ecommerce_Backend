import express, { Request, Response } from "express";
import { imageUploader } from "../middleware/cloudinary";
import { PrismaClient } from "@prisma/client";
import json from "./json.serialised";
const prisma = new PrismaClient();

export const createProduct = async (req: Request, res: Response): Promise<void> => {
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

    res.status(201).json(productcreated);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
   if(req.files){

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
        discountPercentage: parseInt(req.body.discountPercentage) || findProduct?.discountPercentage,
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

    res.status(200).json(updateproduct);
   }else{
    console.log("req.body without img: ", );

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

    res.status(200).json(updateProduct);

   }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  console.log('deleted pro body ', req.params, typeof req.params.id)
  try {
    if(req.params.id){
        const productDeleted = await prisma.product.delete({
      where: {
        id: parseInt(req.params.id)
      }
    })
    console.log("product deleted:  ");
    res.status(201).json(productDeleted);
    }
  
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const getAllProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await prisma.product.findMany({
      take: 18,
      include: {
        brand: true,
        category: true,
      }
    });
    // console.log("all product fetched ", product);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
  }
};

export const getAProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(req.params.id)
      }, 
      include: {
        brand: true,
        category: true
      }
    })
    // console.log("all product fetched ", product);
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
  }
};

export const sortProductAscending = async (req: Request, res: Response): Promise<void> => {
  try {
    const sortedAllProduct = await prisma.product.findMany({
      orderBy: {
        price: 'asc'
      },
      include: {
        brand: true,
        category: true,
      }
    })
    // console.log("all product fetched asc", sortedAllProduct);
    res.status(200).json(sortedAllProduct);
  } catch (error) {
    console.log(error);
  }
};

export const sortProductDescending = async (req: Request, res: Response): Promise<void> => {
  try {
    const sortedAllProduct = await prisma.product.findMany({
      orderBy: {
        price: 'desc'
      },
      include: {
        brand: true,
        category: true,
      }
    })
    // console.log("all product fetched desc ", sortedAllProduct);
    res.status(200).json(sortedAllProduct);
  } catch (error) {
    console.log(error);
  }
};

export const sortProductNewest = async (req: Request, res: Response): Promise<void> => {
  try {
    const sortedAllProduct = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        brand: true,
        category: true,
      }
    })
    // console.log("all product fetched desc ", sortedAllProduct);
    res.status(200).json(sortedAllProduct);
  } catch (error) {
    console.log(error);
  }
};

export const sortProductBestRating = async (req: Request, res: Response): Promise<void> => {
  try {
    const sortedAllProduct = await prisma.product.findMany({
      orderBy: {
        rating: 'desc'
      },
      include: {
        brand: true,
        category: true,
      }
    })
    // console.log("all product fetched desc ", sortedAllProduct);
    res.status(200).json(sortedAllProduct);
  } catch (error) {
    console.log(error);
  }
};

export const searchProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const searchQuery = req.query.q as string
    console.log('qurry result: ' ,req.query)
    const searchkey = searchQuery.toLowerCase()
  const searchItems = await prisma.product.findMany({
    where: {
      OR: [
        { title: { contains: `%${searchkey}%`}},
        { keywords: { contains: `%${searchkey}%`}}
      ]
    }
  })
    console.log("all product fetched search ", searchItems);
    res.status(200).json(searchItems);
  } catch (error) {
    console.log(error);
  }
};

export const paginate = async (req: Request, res: Response): Promise<void> => {
  try {
    const { limit, currentPage } = req.body;
    const pageSize = parseInt(limit);
    const pageNumber = parseInt(currentPage);
    const skip = (pageNumber - 1 ) * pageSize;
    const paginatedResult = await prisma.product.findMany({
      take: pageSize,
      skip,
      include: {
        brand: true,
        category: true,
      }
    })
    res.status(200).json(paginatedResult);
  } catch (error) {
    console.log(error);
  }
};

function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

export const similarProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const categoryTerm =  req.query.q as string;
    const brandTerm =  req.query.m as string;
  
    const similarProduct = await prisma.product.findMany({
      include: {
        category: true,
        brand: true,
      },
      where:{
        OR: [
          {
            category: {
              name: {
                contains: categoryTerm,
              }
            }
          },
          {
            brand:{
              name: {
                contains: brandTerm,
              }
            }
          }
        ]
      },
      take: 4,
    })
    const product = shuffleArray(similarProduct)
    console.log('similar product: ', product)
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
  }
};

export const createProductReview = async (req: Request, res: Response): Promise<void> => {
  try {

    const createproductReview = await prisma.productReview.create({
      data: {
        remark: req.body.remark,
        rating: parseInt(req.body.rating),
        user: {
          connect: {
            id: parseInt(req.body.userId)
          }
        },
        product: {
          connect: {
            id: parseInt(req.body.productId)
          }
        }
    },
    include: {
      user: true,
      product: true,
    }
  })
   console.log('created product')
    res.status(201).type("json").send(json(createproductReview));
  } catch (error) {
    console.log(error);
  }
};

export const getProductReviews = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('fetching..', req.params)
   const getAllProductReviews = await prisma.productReview.findMany({
    where: {
      productId: parseInt(req.params.id)
    },
    include: {
      user: true,
      product: true,
    }
   })
   console.log('fetched product', getAllProductReviews)

    res.status(200).type("json").send(json(getAllProductReviews));
  } catch (error) {
    console.log(error);
  }
};

export const updateProductReviews = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('fetching... ', parseInt(req.body.updatedRating), req.body)
    if(parseInt(req.body.updatedRating)){
         const updateProductReview = await prisma.product.update({
    where: {
      id: parseInt(req.params.id)
    },
    data: {
      rating: parseInt(req.body.updatedRating)
    },
    include: {
      brand: true,
      category: true,
    }
   })

    res.status(200).type("json").send(json(updateProductReview));
    }

  } catch (error) {
    console.log(error);
  }
};


