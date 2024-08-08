import { MongoClient, ObjectId } from 'mongodb'

const client = new MongoClient('mongodb://m4rt1n:s0yM4RT1NG4LV4N@62.72.51.41:27017/')

const db = client.db('MAXIMAL_STRCORP') // LE ERRÉ A LA HORA DE PONER EL NOMBRE, POR LO QUE EN VEZ DE MAXIMAL_SRTCORP ES MAXIMAL_STRCORP

const blog = db.collection('Blog')

async function getAllBlogs(){

    return client.connect()
        .then(async function () {
            return blog.find().toArray()
        })
}

async function getBlogById(id){
    return client.connect()
        .then(function(){
            return blog.find({ _id: new ObjectId(id) }).toArray()

        })
}

async function createBlog(infoBlog){

    return client.connect()
        .then(function(){
            return blog.insertOne(infoBlog)
        })
}

async function editBlog(id, infoBlog){
    return client.connect()
        .then(function(){
            return blog.updateOne({ _id: new ObjectId(id) }, { $set: infoBlog })
        })
}

async function deleteBlog(id){
    return client.connect()
        .then(function(){
            return blog.deleteOne({ _id: new ObjectId(id) })
        })
        .then(function(){
            return true
        })
}


export {
    getAllBlogs,
    getBlogById,
    createBlog,
    editBlog,
    deleteBlog,
}
