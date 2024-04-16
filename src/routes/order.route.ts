import express, {Request, Response} from 'express'
import { deleteOrder, getAllOrder, paginateOrders, updateOrder } from '../controller/order.controller';
import { protectAdmin } from '../middleware/auth.middleware';
const orderRoute = express.Router();

orderRoute.get('/orders', protectAdmin, getAllOrder );
orderRoute.put('/order/:id', protectAdmin, updateOrder );
orderRoute.delete('/order/:id', protectAdmin, deleteOrder );
orderRoute.post('/order/paginate', protectAdmin, paginateOrders );

export default orderRoute;


