import express from 'express';
import { changePassword, checkOutInfo, deleteAUser, getAUser, getAllUser, getOtherUser, login, paginateUser, register, sendRecoveryPasswordLink, userImage, verifyEmail } from '../controller/user.controller';
import { protect, protectAdmin } from '../middleware/auth.middleware';
import { imageUploader } from '../middleware/cloudinary';
import upload from '../middleware/fileMiddleware';

const userRoute = express.Router();

userRoute.post('/user/create', register)
userRoute.post('/user/login', login)
userRoute.put('/user/verify/:id', verifyEmail)
userRoute.post('/user/sendmail', sendRecoveryPasswordLink)
userRoute.put('/user/change/password/:id', changePassword)
userRoute.post('/checkout/info', checkOutInfo)
userRoute.get('/user/:id', protect, getAUser)
userRoute.get('/other/:id', protect, getOtherUser)
userRoute.delete('/user/:id', protectAdmin, deleteAUser)
userRoute.get('/users', protectAdmin, getAllUser)
userRoute.post('/user/paginate', protectAdmin, paginateUser)
userRoute.put('/user/image/:id', protect, upload.single('fileupload'), userImage)

export default userRoute;