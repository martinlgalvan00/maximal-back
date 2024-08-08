
import * as BlogService from '../../services/blog.services.js'

import { upload } from '../middleware/upload.middleware.js'

function findAllBlogs(req, res){

    BlogService.getAllBlogs()
        .then(function(blog){
            res.status(200).json(blog)
        })
}

function findByBlogId(req, res){
    const id = req.params.id_blog

    BlogService.getBlogById(id)
        .then(function(blog){
            if(blog){
                res.status(200).json(blog)
            } else{
                res.status(404).json({message: "Blog no encontrado."})
            }
        })
       
}

function createBlog(req, res){

    const blog = {}

    if(req.body.name){
        blog.name = req.body.name
    }

    if(req.body.info){
        blog.info = req.body.info
    }


    BlogService.createBlog(blog)
        .then(function(blog){
            if(blog){
                res.status(200).json(blog)
            } else{
                res.status(404).json({message: "Blog no creado."})
            }
        })
    }

function editBlog(req, res){
    const id = req.params.idBlog

    const blog = {}

    if(req.body.name){
        blog.name = req.body.name
    } 

    if(req.body.info){
        blog.info = req.body.info
    } 


    BlogService.editBlog(id, blog)
        .then(function(){
            return BlogService.getBlogById(id)
        })
        .then(function(blog) {
            if(blog){
                res.status(200).json({message: "Blog modificada con éxito."})
            } else {
                res.status(404).json({ message: "Blog no encontrado."})
            }
        })

}

function deleteBlog(req, res) {
    const id = req.params.id_blog

    BlogService.deleteBlog(id)
        .then(() => {
            res.json({ message: 'Blog eliminado' })
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}


export {
    findAllBlogs,
    findByBlogId,
    createBlog,
    editBlog,
    deleteBlog,
}