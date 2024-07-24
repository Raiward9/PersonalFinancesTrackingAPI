import { MongoClient, ObjectId} from 'mongodb'

export class Db {

    constructor() {
        this.uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.idvqtkl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
        this.client = new MongoClient(this.uri)
        this.database = this.client.db(process.env.DB_NAME)
        this.users = this.database.collection(process.env.DB_COLLECTION_USERS)
        this.expenses = this.database.collection(process.env.DB_COLLECTION_EXPENSES)
    }

    getOneRowUsers = async (data) => {
        return await this.users.findOne(data)
    }

    createOneRowUsers = async (data) => {
        return await this.users.insertOne(data)
    }

    getOneRowExpenses = async (data) => {
        data._id = ObjectId.createFromHexString(data._id)
        return await this.expenses.findOne(data)
    }

    getManyRowsExpenses = async (mode, lowerBoundDate, upperBoundDate, data) => {

        //? Look if works
        let filter = structuredClone(data)
        filter = this.makeFilter(mode, lowerBoundDate, upperBoundDate, filter)

        const rowsExpenses = this.expenses.find(filter)
        return rowsExpenses.toArray()
    }

    createOneRowExpenses = async (data) => {
        return await this.expenses.insertOne(data)
    }

    deleteOneRowExpenses = async (data) => {
        data._id = ObjectId.createFromHexString(data._id)
        const row = await this.expenses.findOne(data)
        await this.expenses.deleteOne(data)
        return row
    }

    updateOneRowExpenses = async (values) => {
        let {user_id, _id, data} = values
        
        _id = ObjectId.createFromHexString(_id)
        const query = {_id, user_id}
        const update = { $set: data }
        await this.expenses.updateOne(query, update)

        return await this.expenses.findOne({ _id, user_id })
    }

    makeFilter = (mode, lowerBoundDate, upperBoundDate, filter) => {
        if(lowerBoundDate && upperBoundDate) {
            lowerBoundDate = parseInt(lowerBoundDate)
            upperBoundDate = parseInt(upperBoundDate)
            return this.addDatesToFilter(lowerBoundDate, upperBoundDate, filter)
        }
        else if(mode == 'week') {
            const millisecondsWeek = 1000 * 60 * 60 * 24 * 7
            const millisecondsNow = Date.parse(new Date())
            
            lowerBoundDate = millisecondsNow - millisecondsWeek
            upperBoundDate = null
            return this.addDatesToFilter(lowerBoundDate, upperBoundDate, filter)
        }
        else if(mode == 'month') {
            const millisecondsMonth = 1000 * 60 * 60 * 24 * 30
            const millisecondsNow = Date.parse(new Date())
            
            lowerBoundDate = millisecondsNow - millisecondsMonth
            upperBoundDate = null
            return this.addDatesToFilter(lowerBoundDate, upperBoundDate, filter)
        }
        else if(mode == '3month') {
            const milliseconds3Month = 1000 * 60 * 60 * 24 * 30 * 3
            const millisecondsNow = Date.parse(new Date())
            
            lowerBoundDate = millisecondsNow - milliseconds3Month
            upperBoundDate = null
            return this.addDatesToFilter(lowerBoundDate, upperBoundDate, filter)
        }
        else return filter
    }

    addDatesToFilter = (lowerBoundDate, upperBoundDate, filter) => {
        if(lowerBoundDate && upperBoundDate) {
            filter = {
                date: {
                    $gt: lowerBoundDate,
                    $lt: upperBoundDate
                },
                ...filter
            }
        }
        else if(lowerBoundDate) {
            filter = {
                date: {
                    $gt: lowerBoundDate
                },
                ...filter
            }
        }
        else if(upperBoundDate) {
            filter = {
                date: {
                    $lt: upperBoundDate
                },
                ...filter
            }
        }

        console.log(filter)
        return filter
    }
}

