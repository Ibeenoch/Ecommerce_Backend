import express from 'express';
import cors from 'cors';
import productRouter from './routes/product.route';
import dotenv from 'dotenv';
import categoryRoute from './routes/category.route';
import brandRoute from './routes/brand.route';
import userRoute from './routes/user.route';
import paymentRoute from './routes/payment.route';
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/', productRouter)
app.use('/', categoryRoute)     
app.use('/', brandRoute)     
app.use('/', userRoute)     
app.use('/', paymentRoute)     
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log('server connected and running on port ' + PORT)
});