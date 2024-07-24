export class ExpenseModel {

    constructor({ Db }) {
        this.Db = Db
    }
    
    getAll = async (req, res) => {
        const { id: userId } = req.session
        
        try {
            const databaseParams = {
                data: { user_id: userId },
                ...req.query
            }

            const rows = await this.Db.getManyRows(
                databaseParams.mode, databaseParams.lowerBoundDate, databaseParams.upperBoundDate, databaseParams.data
            )
            res.send(rows)
        } catch (error) {
            res.status(500).send(error.message)
        }
    }

    getById = async (req, res) => {
        const { id: userId } = req.session
        
        const { id: expenseId } = req.params
        const rowExpense = await this.Db.getOneRow({ _id: expenseId, user_id: userId}) 
        res.send(rowExpense)
    }   

    createOne = async (req, res) => {
        const { id: userId } = req.session

        try {
            const dataRow = {
                user_id: userId,
                ...req.body
            }
            const rowCreated = await this.Db.createOneRow(dataRow)
            res.send(rowCreated)
        } catch (error) {
            res.status(500).send(error.message)
        }

    }

    updateOne = async (req, res) => {
        const { id: userId } = req.session

        const { id: expenseId } = req.params
        const newValues = req.body

        const updatedRow = await this.Db.updateOneRow({user_id: userId, _id: expenseId, data: newValues})
        res.send(updatedRow)
    }

    deleteOne = async (req, res) => {
        const { id: expenseId } = req.params

        const deletedRow = await this.Db.deleteOneRow({user_id: userId, _id: expenseId })
        res.send(deletedRow)
    }
}
