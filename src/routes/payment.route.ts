import express, {Request, Response} from 'express'
import { getAlltransactionForAuser, makePayment } from '../controller/payment.controller';
const paymentRoute = express.Router();

paymentRoute.post('/checkout/transaction', makePayment );
paymentRoute.get('/transactions/:id', getAlltransactionForAuser );

export default paymentRoute;


