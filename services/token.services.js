import { MongoClient, ObjectId } from 'mongodb'

const client = new MongoClient('mongodb://m4rt1n:S0YM4RT1N@62.72.51.41:27017/')
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
