import * as BlogService from '../../services/blog.services.js';
import { upload } from '../middleware/upload.middleware.js';

function findAllBlogs(req, res) {
    BlogService.getAllBlogs()
        .then(function (blogs) {
            res.status(200).json(blogs);
        });
}

function findByBlogId(req, res) {
    const id = req.params.id_blog;

    BlogService.getBlogById(id)
        .then(function (blog) {
            if (blog) {
                res.status(200).json(blog);
            } else {
                res.status(404).json({ message: "Blog no encontrado." });
            }
        });
}

function createBlog(req, res) {
    let blog;

    // Extraer y parsear los datos JSON enviados en el campo 'data' del FormData
    try {
        blog = JSON.parse(req.body.data);
    } catch (error) {
        return res.status(400).json({ message: 'Datos del blog mal formateados.' });
    }

    // Manejar la imagen si se envía
    if (req.file) {
        blog.image = req.file.filename;  // Suponiendo que uses multer para manejar las imágenes
    }

    BlogService.createBlog(blog)
        .then(function (createdBlog) {
            if (createdBlog) {
                res.status(200).json(createdBlog);
            } else {
                res.status(500).json({ message: "Blog no creado." });
            }
        });
}

function editBlog(req, res) {
    const id = req.params.id_blog;
    let blog;

    // Extraer y parsear los datos JSON enviados en el campo 'data' del FormData
    try {
        blog = JSON.parse(req.body.data);
    } catch (error) {
        return res.status(400).json({ message: 'Datos del blog mal formateados.' });
    }

    // Manejar la imagen si se envía
    if (req.file) {
        blog.image = req.file.filename;  // Suponiendo que uses multer para manejar las imágenes
    }

    BlogService.editBlog(id, blog)
        .then(function () {
            return BlogService.getBlogById(id);
        })
        .then(function (updatedBlog) {
            if (updatedBlog) {
                res.status(200).json({ message: "Blog modificado con éxito." });
            } else {
                res.status(404).json({ message: "Blog no encontrado." });
            }
        });
}

function deleteBlog(req, res) {
    const id = req.params.id_blog;

    BlogService.deleteBlog(id)
        .then(() => {
            res.json({ message: 'Blog eliminado' });
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
}

export {
    findAllBlogs,
    findByBlogId,
    createBlog,
    editBlog,
    deleteBlog,
};
