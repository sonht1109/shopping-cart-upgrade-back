const express = require("express")
const app = express()
const mongoose = require("mongoose")
require("dotenv").config()
const cors = require('cors')

const url = process.env.URL

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', (err) => console.error(err))
db.once('open', ()=> console.log('db connected'))

//routes
const userRouter = require('./routes/users')
const productRouter = require('./routes/products')
const categoryRouter = require('./routes/categories')
const purchaseHistory = require('./routes/purchaseHistory')

app.use(cors())

app.use(express.static('public'))
app.use(express.json())
app.use(userRouter)
app.use(productRouter)
app.use(categoryRouter)
app.use(purchaseHistory)

app.listen(process.env.PORT, ()=> {
    console.log("Server is running !");
})