const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First Name cannot be empty"],
        max: 10,
    },
    lastName: {
        type: String,
        required: [true, "Last Name cannot be empty"],
        max: 10
    },
    email: {
        type: String,
        required: [true, "Email cannot be empty"],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Enter a valid email'],
        unique: true
    },
    password: {
        type: String,
        min: [6, 'Password length must be greater than 6 character']
    },
    books:{
        type: [mongoose.Types.ObjectId]
    }
}, { timestamps: true } )

UserSchema.pre('save', async function(){
    const salt = await bcryptjs.genSalt(10)
    this.password = bcryptjs.hashSync(this.password, salt)
})

UserSchema.methods.comparePassword = async function(password){
    const result = await bcryptjs.compare(password, this.password)
    return result
}

UserSchema.methods.createJWT = function(){
    const token = jwt.sign({
        email: this.email,
        id: this._id
    },process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME})
    return token
}
module.exports = mongoose.model('User', UserSchema)