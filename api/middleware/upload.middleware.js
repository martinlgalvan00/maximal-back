import multer from 'multer';
import path from 'path';


// Configuración de almacenamiento para multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'api/uploads/'); // Directorio donde se guardarán los archivos
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombre del archivo
    }
});

// Filtro de archivos para asegurarnos que solo se suban imágenes
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Solo se permiten imágenes'));
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // 5MB límite de tamaño de archivo
    fileFilter: fileFilter
});

export { upload };
