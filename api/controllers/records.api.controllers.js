
import * as RecordsServices from '../../services/records.services.js'

function findRecords(req, res){

    RecordsServices.getAllRecords()
    .then(function(record){
        if(record){
            res.status(200).json(record)
        } else{
            res.status(404).json({message: "Records no encontrados."})
        }
    })

}

function findRecords52(req, res){

    const clase = req.params.clase
    const claseParsed = parseInt(clase)
    const category = req.params.idCategory
    const sex = req.params.idSex
    const exercise = req.params.sort

    /*const eqUno = req.params.eqUno
    const eqDos = req.params.eqDos*/



    if(exercise === "squat"){
        RecordsServices.getSquatRecords(claseParsed, category, sex)
        .then(function(record){ if(record){ res.status(200).json(record) } })

    } if(exercise === "bench"){
        RecordsServices.getBenchRecords(claseParsed, category, sex)
        .then(function(record){ if(record){ res.status(200).json(record) } })

    } if(exercise === "deadlift"){
        RecordsServices.getBenchRecords(claseParsed, category, sex)
        .then(function(record){ if(record){ res.status(200).json(record) } })

    } if(exercise === "total"){
        RecordsServices.getTotalRecords(claseParsed, category, sex)
        .then(function(record){ if(record){ res.status(200).json(record) } })
    }


}



function findRecords56(req, res){

    RecordsServices.getAllRecords(56)
    .then(function(record){
        if(record){
            res.status(200).json(record)
        } else{
            res.status(404).json({message: "Records no encontrados."})
        }
    })

}

function findByRecordId(req, res){
    const id = req.params.idRecord

    RecordsServices.getRecordById(id)
        .then(function(record){
            if(record){
                res.status(200).json(record)
            } else{
                res.status(404).json({message: "Noticia no encontrada."})
            }
        })
       
}


export {
    findRecords,
    findRecords52,
    findRecords56,
    findByRecordId,
}