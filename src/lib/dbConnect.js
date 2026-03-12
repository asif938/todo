import { MongoClient, ServerApiVersion } from 'mongodb';

export const collectionNamesObj = {
    todoCollection : "todo_list",
    
}

export default function dbConnect(collectionName) {
    // const uri = "mongodb+srv://car-doctor:lG0F4OjfBjMgF3Hd@cluster0.9gy3rvl.mongodb.net/?appName=Cluster0";
    const uri = process.env.MONGO_URI;
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    return client.db('to-do').collection(collectionName)
}