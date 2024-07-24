export const authenticationCookieChecker = (req, res, next) => {
    const { id } = req.session
    if(!id)
        return res.status(403).json({ message: 'Authentication failed' })

    next()
}