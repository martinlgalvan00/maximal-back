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

router.route('/api/blog/:id_blog/')
    .get([isLogin, isAdmin], BlogController.findByBlogId)
    .patch([isLogin, isAdmin, upload.single('image')], BlogController.editBlog)
    .delete([isLogin, isAdmin], BlogController.deleteBlog);

router.route('/api/blog')
    .get(BlogController.findAllBlogs)
    .post([ upload.single('image')], BlogController.createBlog);


export default router