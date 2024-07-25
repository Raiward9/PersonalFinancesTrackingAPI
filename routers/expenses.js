import dotenv from 'dotenv'
import { Router } from 'express'
import { authenticationCookieChecker } from '../middlewares/authenticationCookieChecker.js'
import { ExpenseController } from '../controllers/expense.js'

dotenv.config()

export const expensesRouter = Router()
const expenseController = new ExpenseController()

expensesRouter.use('/', authenticationCookieChecker)

expensesRouter.get('/', expenseController.getAll)
expensesRouter.get('/:id', expenseController.getById)

expensesRouter.post('/', expenseController.createOne)
expensesRouter.patch('/:id', expenseController.updateOne)
expensesRouter.delete('/:id', expenseController.deleteOne)