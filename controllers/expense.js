import { ExpenseModel } from '../models/expense.js'
import { dbExpenses } from '../db/dbExpenses.js'

export class ExpenseController {
    constructor() {
        this.Db = new dbExpenses()
        this.expenseModel = new ExpenseModel({ Db: this.Db })
    }   

    getAll = async (req, res) => {
        const { id: userId } = req.session
        const databaseParams = {
            data: { user_id: userId },
            ...req.query
        }
        return this.expenseModel.getAll(databaseParams, res)
    }

    getById = async (req, res) => {
        const { id: userId } = req.session
        const { id: expenseId } = req.params

        return this.expenseModel.getById({ userId, expenseId }, res)
    }

    createOne = async (req, res) => {
        const { id: userId } = req.session
        const dataRow = {
            user_id: userId,
            ...req.body
        }

        return this.expenseModel.createOne(dataRow, res)
    }

    updateOne = async (req, res) => {
        const { id: userId } = req.session
        const { id: expenseId } = req.params
        const newValues = req.body

        return this.expenseModel.updateOne({ userId, expenseId, newValues }, res)
    }

    deleteOne = async (req, res) => {
        const { id: expenseId } = req.params
        return this.expenseModel.deleteOne({ expenseId }, res)
    }
}