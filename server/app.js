require('dotenv').config()
require('express-async-errors')
const cors = require('cors')

const express = require('express')
const mongoose = require('mongoose')

const app = express()
const port = process.env.PORT
const mongoUri = process.env.MONGO_BASE_URI
const router = require('./route/index')
const errorHandlerMiddleware = require('./middleware/errorHandler')

app.use(cors())
app.use(express.json())
app.use('/', router)


app.use(errorHandlerMiddleware)

mongoose.connect(mongoUri).then(()=>{
    app.listen(port, ()=>{
        console.log(`Server at http://localhost:${port}`)
    })
}).catch((err)=>{
    console.log(err)
})
