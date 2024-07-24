import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { expensesRouter } from './routers/expenses.js'
import { AuthModel } from './models/auth.js'
import { DbUsers } from './db/dbUsers.js'
import { userCookieParser } from './middlewares/userCookieParser.js'

//! problems with config
dotenv.config()

const app = express()
const databaseUsers = new DbUsers()
const authModel = new AuthModel({ Db: databaseUsers })

app.use(express.json())
app.use(cookieParser())
app.use(userCookieParser)

app.use('/expenses', expensesRouter)

app.post('/login', authModel.login)
app.post('/register', authModel.register)

app.listen(process.env.PORT, () => {
    console.log(`Server listening at http://localhost:${process.env.PORT}`)
})