const customAPIError = require('../errors')
const Book = require('../model/Book')
const User = require('../model/User')

const addBook = async(req, res)=>{
    const {userId} = req.user

    if(!userId)
    throw new customAPIError(300, "UserId is required")

    const user = await User.findById(userId)

    if(!user)
    throw new customAPIError(400, "This User cannot make changes at this route")

    const {title, authorName, description, price} = req.body

    if(!title || !authorName || !price)
    throw new customAPIError(300, "book details are missing")

    const book = await Book.create({
        title, authorName, description, price, createdBy: userId
    })

    const updateUser = await User.findByIdAndUpdate(userId, {
        $addToSet: {books: book._id}
    },
    {    runValidators: true , new: true   }
    )

    res.status(200).json({book, updateUser})
}

const deleteBook = async(req, res)=>{
    const {bookId} = req.params
    const {userId} = req.query

    if(!bookId || !userId)
    throw new customAPIError(300, "Book Id and UserId is required")

    const book = await Book.findById(bookId)
    
    if(String(book.createdBy)!==userId)
    throw new customAPIError(400, "This user is not authorized to delete this book as it was created by someone else")

    await User.findByIdAndUpdate(userId,{
        $pull: {books: bookId}
    },{runValidators: true ,new: true})

    await Book.findByIdAndDelete(bookId)
    res.json({success: true})
}

const listAllBook = async(req, res)=>{
    let {title="null", author="null"} = req.query
    
    let search = {}
    const titlePattern = new RegExp(`^${title}`)
    const authorPattern = new RegExp(`^${author}`)
    
    if(title!=="null" && author!=="null")
    {
    search = {
        $and: [
            {title : { $regex: titlePattern, $options: 'i' }},
            {authorName: { $regex: authorPattern, $options: 'i'}}
        ]
    }
    }
    else if(title!=="null")
    {
        search = {title : { $regex: titlePattern, $options: 'i' }}
    }
    else if(author!=="null")
    {
        search = {authorName: { $regex: authorPattern, $options: 'i'}}
    }

    const books = await Book.find(search)

    res.status(200).json({books})
}

module.exports = {
    addBook,
    deleteBook,
    listAllBook
}