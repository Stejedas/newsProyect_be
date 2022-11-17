import { MongoClient } from "mongodb"
import mongoose from "mongoose";
const { JW_BT } = process.env

const URI = `mongodb+srv://stejedas:${JW_BT}@newsproyect.ytinprn.mongodb.net/?retryWrites=true&w=majority`

const client = new MongoClient(URI);
const DATABASE_NAME = 'newsProyect'
const COLLECTION_NAME = 'news'
const ObjectId = mongoose.Types.ObjectId;

export const retrieveAllNews = async () => {
    try {
        await client.connect();
        const db = client.db(DATABASE_NAME);
        const news = db.collection(COLLECTION_NAME);
        return await news.find().toArray();
    } catch (err) {
        console.error(err);
    } finally {
        client.close();
    }
}

export const changeNewStatusById = async (id, newStatus) => {
    try {
        await client.connect();
        const db = client.db(DATABASE_NAME);
        const news = db.collection(COLLECTION_NAME);
        if(newStatus === 'archivate'){
            const resp = await news.updateOne({"_id": new ObjectId(id)}, {$set: { status: newStatus, archiveDate: new Date()}});
            return resp;
        }
        const resp = await news.updateOne({"_id": new ObjectId(id)}, {$set: { status: newStatus}});
        return resp;
    } catch (err) {
        console.error(err);
    } finally {
        client.close();
    }
}


export const retrieveStatusById = async (id) => {
    try {
        await client.connect();
        const db = client.db(DATABASE_NAME);
        const news = db.collection(COLLECTION_NAME);
        const resp = await news.find({"_id": new ObjectId(id)}).toArray();
        return resp[0].status || undefined;
    } catch (err) {
        console.error(err);
    } finally {
        client.close();
    }
}