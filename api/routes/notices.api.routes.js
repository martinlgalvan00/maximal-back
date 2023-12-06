import express from 'express'
import * as NoticeController from '../controllers/notices.api.controllers.js'
import {isLogin, isAdmin} from '../middleware/auth.middleware.js'

import {upload} from '../middleware/upload.middleware.js'



const router = express.Router()

router.route('/api/notices/')
    .get(NoticeController.findAllNotices)
    .post(upload.single('file'),NoticeController.createNotice)

router.route('/api/notices/:idNotice/')
    .get([isLogin, isAdmin],NoticeController.findByNoticeId)
    .patch([isLogin, isAdmin],NoticeController.editNotice)
    .delete([isLogin, isAdmin],NoticeController.deleteNotice)

export default router