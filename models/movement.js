export class MovementModel {

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

    getById = async ({ userId, movementId }, res) => {
        const rowMovement = await this.Db.getOneRow({ _id: movementId, user_id: userId}) 
        res.send(rowMovement)
    }   

    createOne = async (dataRow, res) => {

        try {
            const rowCreated = await this.Db.createOneRow(dataRow)
            res.send(rowCreated)
        } catch (error) {
            res.status(500).send(error.message)
        }

    }

    updateOne = async ({ userId, movementId, newValues }, res) => {    
        const updatedRow = await this.Db.updateOneRow({user_id: userId, _id: movementId, data: newValues})
        res.send(updatedRow)
    }

    deleteOne = async ({ userId, movementId }, res) => {
        const deletedRow = await this.Db.deleteOneRow({ user_id: userId, _id: movementId })
        res.send(deletedRow)
    }
}
