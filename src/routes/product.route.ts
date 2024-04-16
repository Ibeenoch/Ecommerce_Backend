import express from 'express'
import { createProduct, createProductReview, deleteProduct, getAProduct, getAllProduct, getProductReviews, paginate, searchProduct, sortProductAscending, sortProductBestRating, sortProductDescending, sortProductNewest, updateProduct } from '../controller/product.controller';
import upload from '../middleware/fileMiddleware';
import handleRequest from '../middleware/filterRequestmiddleware';
import { protect, protectAdmin } from '../middleware/auth.middleware';

const productRouter = express.Router()

productRouter.post('/product/create', protectAdmin, upload.array('fileupload'), createProduct);
productRouter.get('/products', getAllProduct);
productRouter.get('/product/:id', getAProduct);
productRouter.put('/product/update/:id', protectAdmin, handleRequest, updateProduct);
productRouter.delete('/product/delete/:id', protectAdmin, deleteProduct);
productRouter.get('/sort/product/asc', sortProductAscending);
productRouter.get('/sort/product/desc', sortProductDescending);
productRouter.get('/sort/product/latest', sortProductNewest);
productRouter.get('/sort/product/rating', sortProductBestRating);
productRouter.get('/search/product', searchProduct);
productRouter.post('/product/paginate', paginate);
productRouter.post('/review/product/create', createProductReview);
productRouter.get('/reviews/product', getProductReviews);

export default productRouter;
