import jwt from 'jsonwebtoken'

export const userCookieParser = (req, res, next) => {
    const token = req.cookies['access-token']
    req.session = { id: null }

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.session = data
    } catch (error) {}

    next()
}