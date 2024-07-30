import { ObjectId } from "mongodb";
import { Db } from "./db.js";

export class dbMovements extends Db {
    constructor({ collection }) {
        super()
        this.expenses = this.database.collection(collection)
    }

    getOneRow = async (data) => {
        data._id = ObjectId.createFromHexString(data._id)
        return await this.expenses.findOne(data)
    }

    getManyRows = async (mode, lowerBoundDate, upperBoundDate, data) => {
        let filter = structuredClone(data)
        filter = this.makeFilter(mode, lowerBoundDate, upperBoundDate, filter)

        const rowsExpenses = this.expenses.find(filter)
        return rowsExpenses.toArray()
    }

    createOneRow = async (data) => {
        return await this.expenses.insertOne(data)
    }

    deleteOneRow = async (data) => {
        data._id = ObjectId.createFromHexString(data._id)
        const row = await this.expenses.findOne(data)
        await this.expenses.deleteOne(data)
        return row
    }

    updateOneRow = async (values) => {
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