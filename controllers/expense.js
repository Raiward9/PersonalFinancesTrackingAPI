import { MovementModel } from '../models/movement.js'
import { dbMovements } from '../db/dbMovements.js'
import { validateExpense, validatePartialExpense } from '../schemas/expenses.js'

export class ExpenseController {
    constructor() {
        this.Db = new dbMovements({ collection: process.env.DB_COLLECTION_EXPENSES })
        this.expenseModel = new MovementModel({ Db: this.Db })
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

        return this.expenseModel.getById({ userId, movementId: expenseId }, res)
    }

    createOne = async (req, res) => {
        const { id: userId } = req.session

        const result = validateExpense(req.body)
        if(!result.success) {
            return res.status(400).json({ message: result.error.message })
        }

        const dataRow = {
            user_id: userId,
            ...result.data
        }

        return this.expenseModel.createOne(dataRow, res)
    }

    updateOne = async (req, res) => {
        const { id: userId } = req.session
        const { id: expenseId } = req.params
        const newValues = req.body

        const result = validatePartialExpense(newValues)
        if(!result.success) {
            return res.status(400).json({ message: result.error.message })
        }

        return this.expenseModel.updateOne({ userId, movementId: expenseId, newValues:result.data }, res)
    }

    deleteOne = async (req, res) => {
        const { id: userId } = req.session
        const { id: expenseId } = req.params

        return this.expenseModel.deleteOne({ userId, movementId: expenseId }, res)
    }
}