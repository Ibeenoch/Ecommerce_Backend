import express from 'express'
import { createPost } from '../controller/product.controller';

const productRouter = express.Router()

productRouter.post('/product/create', createPost)

export default productRouter;
