import express from 'express'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import { ExpenseModel } from './models/expense.js'
import { AuthModel } from './models/auth.js'
import { Db } from './db/db.js'

dotenv.config({ path: './.env' })

const app = express()
const database = new Db()
const expenseModel = new ExpenseModel({ Db: database })
const authModel = new AuthModel({ Db: database })

app.use(express.json())
app.use(cookieParser())
app.use((req, res, next) => {
    const token = req.cookies['access-token']
    req.session = { id: null }

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.session = data
    } catch (error) {}

    next()
})

app.get('/expenses', expenseModel.getAll)
app.get('/expenses/:id', expenseModel.getById)

app.post('/expenses', expenseModel.createOne)
app.patch('/expenses/:id', expenseModel.updateOne)
app.delete('/expenses/:id', expenseModel.deleteOne)

app.post('/login', authModel.login)
app.post('/register', authModel.register)

app.listen(process.env.PORT, () => {
    console.log(`Server listening at http://localhost:${process.env.PORT}`)
})