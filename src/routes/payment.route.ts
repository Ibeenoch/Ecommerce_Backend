import express, {Request, Response} from 'express'
import { deletetransaction, getAlltransactionForAuser, getAlltransactions, getAtransactionOfAuser, makePayment, paginatePayment } from '../controller/payment.controller';
import { protectAdmin } from '../middleware/auth.middleware';
const paymentRoute = express.Router();

paymentRoute.post('/checkout/transaction', makePayment );
paymentRoute.get('/transactions/:id', getAlltransactionForAuser );
paymentRoute.get('/transaction/:userId/:id', getAtransactionOfAuser );
paymentRoute.get('/transactions', protectAdmin, getAlltransactions );
paymentRoute.delete('/transaction/:id', protectAdmin, deletetransaction );
paymentRoute.post('/transaction/paginate', protectAdmin, paginatePayment );

export default paymentRoute;


