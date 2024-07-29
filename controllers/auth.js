import { AuthModel } from '../models/auth.js'
import { DbUsers } from '../db/dbUsers.js'
import { validateUser } from '../schemas/users.js'
import { object } from 'zod'

export class AuthController {
    constructor() {
        this.Db = new DbUsers()
        this.authModel = new AuthModel({ Db: this.Db })
    }

    register = async (req, res) => {
        const { username, password } = req.body
        
        const result = validateUser({username, password})
        if(!result.success) {
            return res.status(400).json({ message: result.error.message })
        }

        let { 
            username: validatedUsername, 
            password: validatedPassword
        } = result.data

        try {
            return this.authModel.register({ username: validatedUsername, password: validatedPassword, res })
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }

    login = async (req, res) => {
        const { username, password } = req.body
        
        const result = validateUser({username, password})
        if(!result.success) {
            return res.status(400).json({ message: result.error.message })
        }

        let { 
            username: validatedUsername, 
            password: validatedPassword
        } = result.data

        try {
            return this.authModel.login({ username: validatedUsername, password: validatedPassword, res })
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }

    }    

    logout = async (req, res ) => {
        return this.authModel.logout(res)
    }
} 