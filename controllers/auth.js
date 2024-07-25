import { AuthModel } from '../models/auth.js'
import { DbUsers } from '../db/dbUsers.js'

export class AuthController {
    constructor() {
        this.Db = new DbUsers()
        this.authModel = new AuthModel({ Db: this.Db })
    }

    register = async (req, res) => {
        const { username, password } = req.body
        
        try {
            return this.authModel.register({ username, password, res })
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    }

    login = async (req, res) => {
        const { username, password } = req.body

        try {
            return this.authModel.login({ username, password, res })
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }

    }    

    logout = async (req, res ) => {
        return this.authModel.logout(res)
    }
} 