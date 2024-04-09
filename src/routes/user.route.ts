import express from 'express';
import { register } from '../controller/user.controller';

const userRoute = express.Router();

userRoute.post('/user/create', register)

export default userRoute;