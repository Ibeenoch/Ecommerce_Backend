import express, {Request, Response} from 'express'
import { makePayment } from '../controller/payment.controller';
const paymentRoute = express.Router();

paymentRoute.post('/checkout/transaction', makePayment );

export default paymentRoute;


