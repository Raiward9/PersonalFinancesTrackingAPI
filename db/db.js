import { MongoClient } from 'mongodb'

export class Db {
    constructor() {
        this.uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.idvqtkl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
        this.client = new MongoClient(this.uri)
        this.database = this.client.db(process.env.DB_NAME)
    }

    getOneRow = async (data) => {}
    createOneRow = async(data) => {}
}

