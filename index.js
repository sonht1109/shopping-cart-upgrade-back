const express = require("express")
const app = express()
const mongoose = require("mongoose")
require("dotenv").config()

const url = process.env.URL

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', (err) => console.error(err))
db.once('open', ()=> console.log('db connected'))

//user routes
const userRouter = require('./routes/users')

app.use(express.json())
app.use(userRouter)

app.listen(process.env.PORT, ()=> {
    console.log("Server is running !");
})