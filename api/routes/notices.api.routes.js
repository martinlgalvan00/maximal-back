import express from 'express'
import * as NoticeController from '../controllers/notices.api.controllers.js'

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
    .get(NoticeController.findByBlogId)
    .patch([isLogin, isAdmin, upload.single('image')], NoticeController.editBlog)
    .delete([isLogin, isAdmin], NoticeController.deleteBlog);

router.route('/api/blog')
    .get(NoticeController.findAllBlogs)
    .post([ upload.single('image')], NoticeController.createBlog);


export default router