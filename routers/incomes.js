import dotenv from 'dotenv'
import { Router } from 'express'
import { authenticationCookieChecker } from '../middlewares/authenticationCookieChecker.js'
import { IncomeController } from '../controllers/income.js'

dotenv.config()

export const incomesRouter = Router()
const incomeController = new IncomeController()

incomesRouter.use('/', authenticationCookieChecker)

incomesRouter.get('/', incomeController.getAll)
incomesRouter.get('/:id', incomeController.getById)

incomesRouter.post('/', incomeController.createOne)
incomesRouter.patch('/:id', incomeController.updateOne)
incomesRouter.delete('/:id', incomeController.deleteOne)