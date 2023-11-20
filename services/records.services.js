import { MongoClient, ObjectId } from 'mongodb'

const client = new MongoClient('mongodb://m4rt1n:s0yM4RT1NG4LV4N@62.72.51.41:27017/')

const db = client.db('MAXIMAL_STRCORP') //LE ERRÉ A LA HORA DE PONER EL NOMBRE, POR LO QUE EN VEZ DE MAXIMAL_SRTCORP ES MAXIMAL_STRCORP

const records = db.collection('Records')

async function getSquatRecords(clase, category, sex){
    return client.connect()
        .then(function(){
            return records.find({WeightClassKg: clase, AgeClass: category ,Sex: sex,Event:"SBD",  $or: [ { Equipment: {$eq: "Raw"}}, { Equipment: {$eq : "Wraps"}} ]}).sort({"Best3SquatKg": -1}).limit(30).toArray();
        })}

async function getBenchRecords(clase, category, sex){
    return client.connect()
        .then(function(){
            return records.find({WeightClassKg: clase,AgeClass: category ,Sex: sex,Event:"SBD", $or: [ { Equipment: {$eq: "Raw"}}, { Equipment: {$eq : "Wraps"}} ]}).sort({"Best3BenchKg": -1}).limit(30).toArray();
        })}

async function getDeadliftRecords(clase, category, sex){
    return client.connect()
        .then(function(){
            return records.find({WeightClassKg: clase,AgeClass: category ,Sex: sex,Event:"SBD", $or: [ { Equipment: {$eq: "Raw"}}, { Equipment: {$eq : "Wraps"}} ]}).sort({"Best3DeadliftKg": -1}).limit(30).toArray();
        })}

async function getTotalRecords(clase, category, sex){
    return client.connect()
        .then(function(){
            return records.find({WeightClassKg: clase,AgeClass: category ,Sex: sex,Event:"SBD", $or: [ { Equipment: {$eq: "Raw"}}, { Equipment: {$eq : "Wraps"}} ]}).sort({"TotalKg": -1}).limit(30).toArray();
        })}


async function getRecordById(id){
    return client.connect()
        .then(function(){
            return records.find({ _id: new ObjectId(id) }).toArray()

        })
}

export {
    getSquatRecords,
    getBenchRecords,
    getDeadliftRecords,
    getTotalRecords,
    getRecordById
}
