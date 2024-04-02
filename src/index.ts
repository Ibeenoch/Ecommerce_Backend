import express from 'express';
import cors from 'cors';
import productRouter from './routes/product.route'
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false}));

app.use('/', productRouter)
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log('server connected and running on port ' + PORT)
});