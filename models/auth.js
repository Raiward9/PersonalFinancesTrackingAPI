import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export class AuthModel {

    constructor({ Db }) {
        this.Db = Db
    }
    
    register = async (req, res) => {
        const { username, password } = req.body
        
        let user = await this.Db.getOneRow({ username })
        
        if(user) 
            return res.status(409).send({ message: 'The username already exists' })

        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS))
        
        try {
            user = await this.Db.createOneRow({ username , password: hashedPassword })
        } catch (error) {
            return res.status(500).send({ message: error.message})//'Error creating the user' })
        }

        const token = jwt.sign(
            { id: user.insertedId, username },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "1h"
            }
        )

        user = { id: user.insertedId, username }

        res
            .cookie('access-token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV == 'production',
                sameSite: 'strict',
                maxAge: 1000 * 60 * 60
            })
            .send({ user, token })
    }

    login = async (req, res) => {
        const { username, password } = req.body
        
        try {
            const user = await this.Db.getOneRow({ username })
        
            if(!user) 
                return res.status(401).send({ message: 'username does not exist' })

            const isValid = await bcrypt.compare(password, user.password)

            if(!isValid) 
                return res.status(401).send({ message: 'password is not correct' })
            
            const token = jwt.sign(
                { id: user._id, username: user.username },
                process.env.JWT_SECRET_KEY,
                {
                    expiresIn: "1h"
                }
            )

            const public_user = { id: user._id, username: user.username }

            res
                .cookie('access-token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV == 'production',
                    sameSite: 'strict',
                    maxAge: 1000 * 60 * 60
                })
                .send({ user: public_user, token })

        } catch (error) {
           res.status(500).send(error.message) 
        }
        
    }

    logout = async (req, res) => {
        res
            .clearCookie('access-token')
            .json({ message: 'Logout successful'})
    }
}