const express = require('express')
const mongoose = require('mongoose')


require('dotenv').config()

const app = express()
const mongoUri = process.env.MONGO_URI
const port = process.env.PORT || 5000


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