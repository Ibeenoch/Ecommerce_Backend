import express from 'express'
import { createProduct, deleteProduct, getAProduct, getAllProduct, sortProductAscending, sortProductBestRating, sortProductDescending, sortProductNewest, updateProduct } from '../controller/product.controller';
import upload from '../middleware/fileMiddleware';
import handleRequest from '../middleware/filterRequestmiddleware';

const productRouter = express.Router()

productRouter.post('/product/create', upload.array('fileupload'), createProduct);
productRouter.get('/products', getAllProduct);
productRouter.get('/product/:id', getAProduct);
productRouter.put('/product/update/:id', handleRequest, updateProduct);
productRouter.delete('/product/delete/:id', deleteProduct);
productRouter.get('/sort/product/asc', sortProductAscending);
productRouter.get('/sort/product/desc', sortProductDescending);
productRouter.get('/sort/product/latest', sortProductNewest);
productRouter.get('/sort/product/rating', sortProductBestRating);

export default productRouter;
