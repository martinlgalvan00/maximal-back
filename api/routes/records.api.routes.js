import express from 'express'
import * as RecordsController from '../controllers/records.api.controllers.js'

const router = express.Router()


router.route('/api/records/:sort/:idClase/:idCategory/:idSex')
    .get(RecordsController.findRecords52)



router.route('/api/records/:idRecord')
    .get(RecordsController.findByRecordId)

export default router