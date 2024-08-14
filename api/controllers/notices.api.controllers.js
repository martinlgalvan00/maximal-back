
import * as NoticeServices from '../../services/notices.services.js'
import * as BlogService from '../../services/blog.services.js';

import cloudinary from 'cloudinary';
import fs from 'fs';
import streamifier from 'streamifier';
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
        blog = JSON.parse(req.body.data);
    } catch (error) {
        console.error('Error al parsear los datos del blog:', error);
        return res.status(400).json({ message: 'Datos del blog mal formateados.' });
    }

    try {
        if (req.file) {
            // Subir imagen a Cloudinary desde el buffer en memoria
            const streamUpload = (req) => {
                return new Promise((resolve, reject) => {
                    let stream = cloudinary.v2.uploader.upload_stream((error, result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    });
                    streamifier.createReadStream(req.file.buffer).pipe(stream);
                });
            };

            const result = await streamUpload(req);
            blog.image = result.secure_url;
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

    try {
        blog = JSON.parse(req.body.data);
        delete blog._id; // Evitar intentar actualizar el campo _id
    } catch (error) {
        return res.status(400).json({ message: 'Datos del blog mal formateados.' });
    }

    try {
        if (req.file) {
            const streamUpload = (req) => {
                return new Promise((resolve, reject) => {
                    let stream = cloudinary.v2.uploader.upload_stream((error, result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    });
                    streamifier.createReadStream(req.file.buffer).pipe(stream);
                });
            };

            const result = await streamUpload(req);
            blog.image = result.secure_url;
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