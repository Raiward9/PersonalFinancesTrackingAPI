export class ExpenseModel {

    constructor({ Db }) {
        this.Db = Db
    }
    
    getAll = async (req, res) => {
        const { id } = req.session
        if(!id) return res.status(403).json({ message: 'Authentication required' })
        
        try {
            const databaseParams = {
                data: { user_id: id },
                ...req.query
            }

            const rows = await this.Db.getManyRowsExpenses(
                databaseParams.mode, databaseParams.lowerBoundDate, databaseParams.upperBoundDate, databaseParams.data
            )
            res.send(rows)
        } catch (error) {
            res.status(500).send(error.message)
        }
    }

    getById = async (req, res) => {
        const { id: userId } = req.session
        if(!userId) return res.status(403).json({ message: 'Authentication required' })
        
        const { id: expenseId } = req.params
        const rowExpense = await this.Db.getOneRowExpenses({ _id: expenseId, user_id: userId}) 
        res.send(rowExpense)
    }   

    createOne = async (req, res) => {
        const { id } = req.session
        if(!id) return res.status(403).json({ message: 'Authentication required' })
        
        try {
            const dataRow = {
                user_id: id,
                ...req.body
            }
            const rowCreated = await this.Db.createOneRowExpenses(dataRow)
            res.send(rowCreated)
        } catch (error) {
            res.status(500).send(error.message)
        }

    }

    updateOne = async (req, res) => {
        const { id: userId } = req.session
        if(!userId) return res.status(403).json({ message: 'Authentication required' })
        
        const { id: expenseId } = req.params
        const newValues = req.body

        const updatedRow = await this.Db.updateOneRowExpenses({user_id: userId, _id: expenseId, data: newValues})
        res.send(updatedRow)
    }

    deleteOne = async (req, res) => {
        const { id: userId } = req.session
        if(!userId) return res.status(403).json({ message: 'Authentication required' })
        
        const { id: expenseId } = req.params

        const deletedRow = await this.Db.deleteOneRowExpenses({user_id: userId, _id: expenseId })
        res.send(deletedRow)
    }
}
