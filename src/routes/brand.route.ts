import express, {Request, Response} from 'express'
import { getAllBrands, getProductByBrand } from '../controller/brand.controller';

const brandRoute = express.Router();

brandRoute.get('/brands', getAllBrands);
brandRoute.get('/brand/:name', getProductByBrand);

export default brandRoute;