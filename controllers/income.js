import { MovementModel } from '../models/movement.js'
import { dbMovements } from '../db/dbMovements.js'
import { validateIncome, validatePartialIncome } from '../schemas/incomes.js'

export class IncomeController {
    constructor() {
        this.Db = new dbMovements({ collection: process.env.DB_COLLECTION_INCOMES })
        this.incomeModel = new MovementModel({ Db: this.Db })
    }   

    getAll = async (req, res) => {
        const { id: userId } = req.session
        const databaseParams = {
            data: { user_id: userId },
            ...req.query
        }
        return this.incomeModel.getAll(databaseParams, res)
    }

    getById = async (req, res) => {
        const { id: userId } = req.session
        const { id: incomeId } = req.params

        return this.incomeModel.getById({ userId, movementId: incomeId }, res)
    }

    createOne = async (req, res) => {
        const { id: userId } = req.session

        const result = validateIncome(req.body)
        if(!result.success) {
            return res.status(400).json({ message: result.error.message })
        }

        const dataRow = {
            user_id: userId,
            ...result.data
        }

        return this.incomeModel.createOne(dataRow, res)
    }

    updateOne = async (req, res) => {
        const { id: userId } = req.session
        const { id: incomeId } = req.params
        const newValues = req.body

        const result = validatePartialIncome(newValues)
        if(!result.success) {
            return res.status(400).json({ message: result.error.message })
        }

        return this.incomeModel.updateOne({ userId, movementId: incomeId, newValues:result.data }, res)
    }

    deleteOne = async (req, res) => {
        const { id: userId } = req.session
        const { id: incomeId } = req.params

        return this.incomeModel.deleteOne({ userId, movementId: incomeId }, res)
    }
}