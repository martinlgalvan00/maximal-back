
import * as NoticeServices from '../../services/notices.services.js'

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

    const notice = {
        name: req.body.name,
        description: req.body.description,
        form: req.body.form,
        file: req.file
    }



    //Guardo la noticia
    console.log(notice)
    NoticeServices.createNotice(notice)
        .then(function(notice){
            console.log(notice)
            
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


export {
    findAllNotices,
    findByNoticeId,
    createNotice,
    editNotice,
    deleteNotice,
}