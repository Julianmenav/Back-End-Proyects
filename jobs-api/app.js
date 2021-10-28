require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const mongoose = require('mongoose')

const jobsRouter = require('./routes/jobs')
const authRouter = require('./routes/auth')

const errorHandlerMiddleware = require('./middleware/error-handler')
const notFoundMiddleware = require('./middleware/not-found')

app.use(express.json())

//routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', jobsRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const mongoUri = process.env.MONGO_URI
const port = process.env.PORT

const start = async () => {
    try {
        mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(console.log("Connected to database"))
        app.listen(port, console.log(`Server listening on localhost ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

start()