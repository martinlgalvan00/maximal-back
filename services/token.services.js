import { MongoClient, ObjectId } from 'mongodb'

const client = new MongoClient('mongodb://g4lv4n:S0YG4LV4N22@191.96.31.180:27017/')
const db = client.db('MAXIMAL_STRCORP')
const tokens = db.collection('Tokens')

async function create(token) {
    await client.connect()

    await tokens.insertOne(token)
}


async function findByToken(token) {
    await client.connect()

    const tokenFound = await tokens.findOne({ token })

    return tokenFound
}


async function deleteByToken(token) {
    await client.connect()

    await tokens.deleteOne({ token })
}

export {
    create,
    findByToken,
    deleteByToken
}
