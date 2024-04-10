import express from 'express';
import { changePassword, checkOutInfo, login, register, sendRecoveryPasswordLink, verifyEmail } from '../controller/user.controller';

const userRoute = express.Router();

userRoute.post('/user/create', register)
userRoute.post('/user/login', login)
userRoute.put('/user/verify/:id', verifyEmail)
userRoute.post('/user/sendmail', sendRecoveryPasswordLink)
userRoute.post('/user/change/password', changePassword)
userRoute.post('/checkout/info', checkOutInfo)

export default userRoute;