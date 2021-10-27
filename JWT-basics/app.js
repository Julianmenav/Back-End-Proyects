require('dotenv').config()
require('express-async-errors')

const mongoose = require('mongoose')
const express = require('express')
const app = express()

const mainRouter = require('./routes/main')
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// middleware
app.use(express.static('./public'))
app.use(express.json())

app.use('/api/v1', mainRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000
const mongoUri = process.env.MONGO_URI

const start = async () => {
  try {
    // await mongoose.connect(mongoUri, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true
    // }).then(console.log('Connected to DB'))
    app.listen(port, console.log(`Server listening on localhost ${port}...`))
  } catch (error) {
    console.log(error)
  }
}
start()
