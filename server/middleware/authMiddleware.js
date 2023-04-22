const jwt = require('jsonwebtoken')
const customAPIError = require('../errors/index')

const authenticateUser = async (req, res, next)=>{
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer '))
    throw new customAPIError(400,'Invalid authorization header')

    const token = authHeader.split(' ')[1]
    
    try {
        const payLoad = jwt.verify(token, process.env.JWT_SECRET)
        req.user = { email: payLoad.email, userId: payLoad.id }
        next()
    } catch (error) {
        throw new customAPIError(400,'Authentication Invalid')   
    }
}

module.exports = authenticateUser