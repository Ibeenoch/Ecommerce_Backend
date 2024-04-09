import express, {Request, Response} from 'express'
import { getAllCategories, getProductByCategory } from '../controller/category.controller';

const categoryRoute = express.Router();

categoryRoute.get('/categories', getAllCategories)
categoryRoute.get('/category/:name', getProductByCategory)

export default categoryRoute;