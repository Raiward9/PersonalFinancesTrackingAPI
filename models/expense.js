export class ExpenseModel {

    constructor({ Db }) {
        this.Db = Db
    }
    
    getAll = async (databaseParams, res) => {
        try {
            const rows = await this.Db.getManyRows(
                databaseParams.mode, databaseParams.lowerBoundDate, databaseParams.upperBoundDate, databaseParams.data
            )
            res.send(rows)
        } catch (error) {
            res.status(500).send(error.message)
        }
    }

    getById = async ({ userId, expenseId }, res) => {
        const rowExpense = await this.Db.getOneRow({ _id: expenseId, user_id: userId}) 
        res.send(rowExpense)
    }   

    createOne = async (dataRow, res) => {

        try {
            const rowCreated = await this.Db.createOneRow(dataRow)
            res.send(rowCreated)
        } catch (error) {
            res.status(500).send(error.message)
        }

    }

    updateOne = async ({ userId, expenseId, newValues }, res) => {    
        const updatedRow = await this.Db.updateOneRow({user_id: userId, _id: expenseId, data: newValues})
        res.send(updatedRow)
    }

    deleteOne = async ({ expenseId }, res) => {
        const deletedRow = await this.Db.deleteOneRow({user_id: userId, _id: expenseId })
        res.send(deletedRow)
    }
}
