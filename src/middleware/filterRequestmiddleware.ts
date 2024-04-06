import express, {Request, Response, NextFunction} from 'express'
import upload from './fileMiddleware'

const handleRequest = (req: Request, res: Response, next: NextFunction) => {
    if(req.is('multipart/form-data')){
        return upload.array('fileupload')(req, res, next)
    }else{
        return next()
    }
}

export default handleRequest