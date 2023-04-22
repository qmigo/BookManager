const User = require('../model/User')
const customAPIError = require('../errors/index')
const Book = require('../model/Book')
 
const register = async(req, res)=>{
    const {firstName, lastName, email, password} = req.body

    if(!firstName || !lastName || !email || !password)
    throw new customAPIError(300, 'One of the signup entry is missing')

    const user = await User.create({
        firstName, lastName, email, password
    })

    if(!user)
    throw new customAPIError(301, "Something went wrong , cannot create user")

    res.status(200).json({ sucess: true })
}

const login = async(req, res)=>{
    const {email, password} = req.body
    if(!email || !password)
    throw new customAPIError(300, "One of the signin entry is missing")

    const user = await User.findOne({email})

    if(!user)
    throw new customAPIError(400, `User with ${email} not exist`)

    const isPasswordCorrect = await user.comparePassword(password) 
    if(!isPasswordCorrect)
    throw new customAPIError(401, "Wrong Password")

    const token = user.createJWT()
    res.status(200).json({token, id:String(user._id), name: user.firstName})
}

const dashboard = async (req, res)=>{
    if(!req.query.userId)
    throw new customAPIError(300, "UserId is mandadtory")

    if(req.user.userId !== req.query.userId)
    throw new customAPIError(400, "Not Authorized")

    const user = await User.findById(req.query.userId).select("books")

    if(!user)
    throw new customAPIError(400, "User not Found")

    const books = await Promise.all(
        user.books.map(async ({_id})=>{
            return await Book.findById(_id)
        })
    )
    res.status(200).json({books})
}

module.exports = {
    register,
    login,
    dashboard
}