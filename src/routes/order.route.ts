import express, {Request, Response} from 'express'
import { getAllOrder, updateOrder } from '../controller/order.controller';
import { protectAdmin } from '../middleware/auth.middleware';
const orderRoute = express.Router();

orderRoute.get('/orders', protectAdmin, getAllOrder );
orderRoute.put('/order/:id', protectAdmin, updateOrder );

export default orderRoute;


