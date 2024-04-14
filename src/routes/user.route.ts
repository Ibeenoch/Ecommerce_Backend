import express from 'express';
import { changePassword, checkOutInfo, getAUser, getAllUser, login, register, sendRecoveryPasswordLink, userImage, verifyEmail } from '../controller/user.controller';
import { protect } from '../middleware/auth.middleware';
import { imageUploader } from '../middleware/cloudinary';
import upload from '../middleware/fileMiddleware';

const userRoute = express.Router();

userRoute.post('/user/create', register)
userRoute.post('/user/login', login)
userRoute.put('/user/verify/:id', verifyEmail)
userRoute.post('/user/sendmail', sendRecoveryPasswordLink)
userRoute.put('/user/change/password/:id', changePassword)
userRoute.post('/checkout/info', checkOutInfo)
userRoute.get('/user/:id', getAUser)
userRoute.get('/users', getAllUser)
userRoute.put('/user/image/:id', protect, upload.single('fileupload'), userImage)

export default userRoute;