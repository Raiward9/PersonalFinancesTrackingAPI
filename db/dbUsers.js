import { Db } from './db.js'

export class DbUsers extends Db {

    constructor() {
        super()
        this.users = this.database.collection(process.env.DB_COLLECTION_USERS)
    }

    getOneRow = async (data) => {
        return await this.users.findOne(data)
    }

    createOneRow = async (data) => {
        return await this.users.insertOne(data)
    }

}