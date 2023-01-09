import { MongoClient, ObjectId } from 'mongodb'

const client = new MongoClient('mongodb+srv://martinlgalvan:onenote11@cluster0.mfppdgp.mongodb.net/?retryWrites=true&w=majority')
const db = client.db('MAXIMAL_STRCORP')
const records = db.collection('Records')

/*async function getAllRecords(){

    const pipeline = [
        {$match:{ BodyweightKg: {$lte: 52},Sex:"M",Event:"SBD", Equipment: "Raw"}},
        {$group:{_id:"$_id", recordSquat: {$max: "$Best3SquatKg"}, recordDeadlift: {$max: "$Best3DeadliftKg"}, recordBench: {$max: "$Best3BenchKg"} }},
        {$sort: {recordSquat: -1}},
        {$limit: 3}
        ]

    return client.connect()
        .then(function(){
            return records.aggregate(pipeline).toArray();

        })
        
}*/

async function getSquatRecords(clase, category, sex){
    return client.connect()
        .then(function(){
            return records.find({WeightClassKg: clase,AgeClass: category ,Sex: sex,Event:"SBD", $or: [ { Equipment: {$eq: "Raw"}}, { Equipment: {$eq : "Wraps"}} ]}).sort({"Best3SquatKg": -1}).limit(30).toArray();
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