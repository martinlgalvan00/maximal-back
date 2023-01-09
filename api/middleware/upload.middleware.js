import multer from 'multer'

let storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,"uploads")
    },
    filename: function(req, file, cb){
        cb(null, `${Date.now()}&${file.originalname}`)
    }
})
    
    let upload = multer ({
        storage: storage,
        fileFilter: function(req, file, callback){
            if(file.mimetype == "image/png" || file.mimetype == "image/jpg" )
                {
                callback(null, true)
                } else{
                    console.log('Solo pueden cargarse imagenes!')
                    callback(null, false)
                }
        },
        limits:{
            fileSize: 1024 * 1024 * 2
        }
    })



export {
    upload
}