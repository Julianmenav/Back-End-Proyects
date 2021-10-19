const express = require('express')
const mongoose = require('mongoose')

const tasks = require('./routes/tasks')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000
const mongoUri = process.env.MONGO_URI

//middleware
app.use(express.json())
app.use(express.static("./public"))

//routes
app.use("/api/v1/tasks", tasks)

//DB connection
const start = async () => {
    try {
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(console.log("Connected to Database"))
        app.listen(port, console.log(`Server listening on localhost ${port}...`))
    } catch (error) {
        console.log(error)
    }
}
start()


