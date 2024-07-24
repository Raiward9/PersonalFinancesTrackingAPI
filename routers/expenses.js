import { Router } from 'express'
import { ExpenseModel } from '../models/expense.js'
import { dbExpenses } from '../db/dbExpenses.js'
import { authenticationCookieChecker } from '../middlewares/authenticationCookieChecker.js'

export const expensesRouter = Router()

const databaseExpenses = new dbExpenses() 
const expenseModel = new ExpenseModel({ Db: databaseExpenses })

expensesRouter.use('/', authenticationCookieChecker)

expensesRouter.get('/', expenseModel.getAll)
expensesRouter.get('/:id', expenseModel.getById)

expensesRouter.post('/', expenseModel.createOne)
expensesRouter.patch('/:id', expenseModel.updateOne)
expensesRouter.delete('/:id', expenseModel.deleteOne)