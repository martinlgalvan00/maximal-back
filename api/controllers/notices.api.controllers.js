
import * as NoticeServices from '../../services/notices.services.js'
import * as BlogService from '../../services/blog.services.js';

import cloudinary from 'cloudinary';
import fs from 'fs';

import dotenv from 'dotenv';
dotenv.config();

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

import { upload } from '../middleware/upload.middleware.js'

function findAllNotices(req, res){

    NoticeServices.getAllNotices()
        .then(function(notice){
            res.status(200).json(notice)
        })
}

function findByNoticeId(req, res){
    const id = req.params.idNotice

    NoticeServices.getNoticeById(id)
        .then(function(notice){
            if(notice){
                res.status(200).json(notice)
            } else{
                res.status(404).json({message: "Noticia no encontrada."})
            }
        })
       
}

function createNotice(req, res){

    const notice = {}

    if(req.body.name){
        notice.name = req.body.name
    }

    if(req.body.description){
        notice.description = req.body.description
    }

    if(req.body.form){
        notice.form = req.body.form
    }

    /*if(req.file){
        notice.file = req.file
    }*/

    NoticeServices.createNotice(notice)
        .then(function(notice){
            if(notice){
                res.status(200).json(notice)
            } else{
                res.status(404).json({message: "Noticia no creada."})
            }
        })
    }

function editNotice(req, res){
    const id = req.params.idNotice

    const notice = {}

    if(req.body.name){
        notice.name = req.body.name
    } 

    if(req.body.description){
        notice.description = req.body.description
    } 

    if(req.body.form){
        notice.form = req.body.form
    } 


    NoticeServices.editNotice(id, notice)
        .then(function(){
            return NoticeServices.getNoticeById(id)
        })
        .then(function(notice) {
            if(notice){
                res.status(200).json({message: "Noticia modificada con éxito."})
            } else {
                res.status(404).json({ message: "Noticia no encontrada."})
            }
        })

}

function deleteNotice(req, res) {
    const id = req.params.idNotice

    NoticeServices.deleteNotice(id)
        .then(() => {
            res.json({ message: 'Noticia eliminado' })
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}












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

async function createBlog(req, res) {
    let blog;

    try {
        // Extraer y parsear los datos JSON enviados en el campo 'data' del FormData
        blog = JSON.parse(req.body.data);
    } catch (error) {
        console.error('Error al parsear los datos del blog:', error);
        return res.status(400).json({ message: 'Datos del blog mal formateados.' });
    }

    try {
        // Manejar la imagen si se envía
        if (req.file) {
            const result = await cloudinary.v2.uploader.upload(req.file.path, { folder: 'blogs/' });
            blog.image = result.secure_url;

            // Eliminar el archivo temporal después de subirlo a Cloudinary
            fs.unlinkSync(req.file.path);
        } else {
            console.warn('No se envió ninguna imagen en la solicitud.');
        }

        const createdBlog = await BlogService.createBlog(blog);
        if (createdBlog) {
            res.status(200).json(createdBlog);
        } else {
            console.error('Error al crear el blog: Operación fallida.');
            res.status(500).json({ message: "Blog no creado." });
        }
    } catch (error) {
        console.error('Error al interactuar con Cloudinary o el servicio de blog:', error);
        res.status(500).json({ message: 'Error al procesar la solicitud de creación del blog.' });
    }
}
async function editBlog(req, res) {
    const id = req.params.id_blog;
    let blog;

    // Extraer y parsear los datos JSON enviados en el campo 'data' del FormData
    try {
        blog = JSON.parse(req.body.data);

        // Eliminar el campo _id del objeto blog para evitar intentar actualizarlo
        delete blog._id;
    } catch (error) {
        return res.status(400).json({ message: 'Datos del blog mal formateados.' });
    }

    try {
        if (req.file) {
            const result = await cloudinary.v2.uploader.upload(req.file.path, { folder: 'blogs/' });
            blog.image = result.secure_url;

            // Eliminar el archivo temporal después de subirlo a Cloudinary
            fs.unlinkSync(req.file.path);
        }

        await BlogService.editBlog(id, blog);
        const updatedBlog = await BlogService.getBlogById(id);
        if (updatedBlog) {
            res.status(200).json({ message: "Blog modificado con éxito." });
        } else {
            res.status(404).json({ message: "Blog no encontrado." });
        }
    } catch (error) {
        console.error('Error al interactuar con Cloudinary o el servicio de blog:', error);
        res.status(500).json({ message: 'Error al procesar la solicitud de modificación del blog.' });
    }
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
    findAllNotices,
    findByNoticeId,
    createNotice,
    editNotice,
    deleteNotice,
    findAllBlogs,
    findByBlogId,
    createBlog,
    editBlog,
    deleteBlog,
}