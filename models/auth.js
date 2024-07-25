import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export class AuthModel {

    constructor({ Db }) {
        this.Db = Db
    }
    
    register = async ({ username, password, res }) => {
        
        let user = await this.Db.getOneRow({ username })
        
        if(user) 
            return res.status(409).send({ message: 'The username already exists' })

        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS))
        
        try {
            user = await this.Db.createOneRow({ username , password: hashedPassword })
        } catch (error) {
            return res.status(500).send({ message: error.message})//'Error creating the user' })
        }

        return this.createResponseWithCookie({ id: user.insertedId, username, res })
    }

    login = async ({ username, password, res }) => {
        try {
            const user = await this.Db.getOneRow({ username })
        
            if(!user) 
                return res.status(401).send({ message: 'username does not exist' })

            const isValid = await bcrypt.compare(password, user.password)

            if(!isValid) 
                return res.status(401).send({ message: 'password is not correct' })

            return this.createResponseWithCookie({ id: user._id, username: user.username, res })

        } catch (error) {
           res.status(500).send(error.message) 
        }
        
    }

    logout = async ({ res }) => {
        return res
                .clearCookie('access-token')
                .json({ message: 'Logout successful'})
    }

    createResponseWithCookie = ({ id, username, res }) => {
        const token = jwt.sign(
            { id, username },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "1h"
            }
        )

        const user = { id, username }

        res
            .cookie('access-token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV == 'production',
                sameSite: 'strict',
                maxAge: 1000 * 60 * 60
            })
            .send({ user, token })
    } 
}