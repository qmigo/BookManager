const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Book Title cannot be empty"],
    },
    authorName: {
        type: String,
        required: [true, "Author Name cannot be empty"],
    },
    description:{
        type: String,
        required: false,
        max: [50, 'Description above 50 characters not allowed'],
    },
    price:{
        type: Number,
        required: true,
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true } )

module.exports = mongoose.model('Book', BookSchema)