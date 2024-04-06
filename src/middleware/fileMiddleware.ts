import multer from "multer";
console.log('multer')
//create a storage
const imageStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        console.log('home'+ req)
        cb(null, './images/')
    },
    filename: function(req, file, cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    } 
})

const upload = multer({ storage: imageStorage });

export default upload;