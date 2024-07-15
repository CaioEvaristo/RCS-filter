import { MongoClient, ObjectId } from 'mongodb'

// Connection URL
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
const database_name = process.env.MONGO_DATABASE;

async function connect() {
    await client.connect();
    console.log('Mongo Connect')

    return true;
}

async function mongodb_list(params) {
    try {
        const database = client.db(database_name);
        const collection = database.collection("keys");

        const result = collection.findOne({});

        return result;
    } catch (error) {
        console.log(error)
        throw error.message;
    }
}

export {
    connect,
    mongodb_list
}