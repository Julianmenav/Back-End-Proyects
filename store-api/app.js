const express = require('express')
const mongoose = require('mongoose')

const productsRouter = require('./routes/products')
const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

require('dotenv').config()
require('express-async-errors')

const app = express()
const mongoUri = process.env.MONGO_URI
const port = process.env.PORT || 5000

app.use(express.json())


//routes
app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>')
})

app.use('/api/v1/products', productsRouter)



//product route

app.use(notFoundMiddleware)
app.use(errorMiddleware)




const start = async () => {
    try {
        await mongoose.connect(mongoUri).then(console.log("Connected to DB"))
        app.listen(port, console.log(`Server listening on localhost ${port}...`))
    } catch (error) {
        console.log(error)
    }
}
start()



















// const start = async () => {
//     try {
//         await mongoose.connect(mongoUri, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         }).then(console.log("Connected to Database"))
//         app.listen(port, console.log(`Server listening on localhost ${port}...`))
//     } catch (error) {
//         console.log(error)
//     }
// }
// start()