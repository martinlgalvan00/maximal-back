import { MongoClient, ObjectId } from 'mongodb'

const client = new MongoClient('mongodb://martin:onenote11@168.197.48.203/')
const db = client.db('MAXIMAL_STRCORP')
const records = db.collection('Records')

async function getSquatRecords(clase, category, sex, eqUno, eqDos){
    return client.connect()
        .then(function(){
            return records.find({WeightClassKg: clase, AgeClass: category ,Sex: sex,Event:"SBD",  $or: [ { Equipment: {$eq: eqUno}}, { Equipment: {$eq : eqDos}} ]}).sort({"Best3SquatKg": -1}).limit(30).toArray();
        })}

async function getBenchRecords(clase, category, sex,eqUno,eqDos){
    return client.connect()
        .then(function(){
            return records.find({WeightClassKg: clase,AgeClass: category ,Sex: sex,Event:"SBD", $or: [ { Equipment: {$eq: eqUno}}, { Equipment: {$eq : eqDos}} ]}).sort({"Best3BenchKg": -1}).limit(30).toArray();
        })}

async function getDeadliftRecords(clase, category, sex,eqUno,eqDos){
    return client.connect()
        .then(function(){
            return records.find({WeightClassKg: clase,AgeClass: category ,Sex: sex,Event:"SBD", $or: [ { Equipment: {$eq: eqUno}}, { Equipment: {$eq : eqDos}} ]}).sort({"Best3DeadliftKg": -1}).limit(30).toArray();
        })}

async function getTotalRecords(clase, category, sex,eqUno,eqDos){
    return client.connect()
        .then(function(){
            return records.find({WeightClassKg: clase,AgeClass: category ,Sex: sex,Event:"SBD", $or: [ { Equipment: {$eq: eqUno}}, { Equipment: {$eq : eqDos}} ]}).sort({"TotalKg": -1}).limit(30).toArray();
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