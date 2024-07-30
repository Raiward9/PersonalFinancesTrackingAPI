import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { expensesRouter } from './routers/expenses.js'
import { AuthController } from './controllers/auth.js'
import { userCookieParser } from './middlewares/userCookieParser.js'
import { incomesRouter } from './routers/incomes.js'

dotenv.config()

const app = express()
const authController = new AuthController()

app.use(express.json())
app.use(cookieParser())
app.use(userCookieParser)

app.use('/expenses', expensesRouter)
app.use('/incomes', incomesRouter)

app.post('/login', authController.login)
app.post('/register', authController.register)

app.listen(process.env.PORT, () => {
    console.log(`Server listening at http://localhost:${process.env.PORT}`)
})