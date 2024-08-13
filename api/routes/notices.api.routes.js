import express from 'express'
import * as NoticeController from '../controllers/notices.api.controllers.js'
import * as BlogController from '../controllers/blog.api.controllers.js'
import {isLogin, isAdmin} from '../middleware/auth.middleware.js'

import {upload} from '../middleware/upload.middleware.js'



const router = express.Router()

router.route('/api/notices/')
    .get(NoticeController.findAllNotices)
    .post([isLogin, isAdmin],NoticeController.createNotice)

router.route('/api/notices/:idNotice/')
    .get([isLogin, isAdmin],NoticeController.findByNoticeId)
    .patch([isLogin, isAdmin],NoticeController.editNotice)
    .delete([isLogin, isAdmin],NoticeController.deleteNotice)

    router.route('/api/blog')
    .all(isLogin)  // Aplica autenticación a todos los métodos
    .get((req, res) => {
        if (req.query.id_blog) {
            // Si se proporciona un ID en la query, obtener el blog por ID
            isAdmin(req, res, () => BlogController.findByBlogId(req, res));
        } else {
            // De lo contrario, obtener todos los blogs
            BlogController.findAllBlogs(req, res);
        }
    })
    .post(upload.single('image'), (req, res) => {
        BlogController.createBlog(req, res);
    })
    .patch(upload.single('image'), (req, res) => {
        isAdmin(req, res, () => BlogController.editBlog(req, res));
    })
    .delete((req, res) => {
        isAdmin(req, res, () => BlogController.deleteBlog(req, res));
    });


export default router