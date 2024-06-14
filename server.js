const express = require("express")
const app = express()
const morgan = require("morgan")
const mongoose = require("mongoose")
require("dotenv").config()
const {expressjwt} = require('express-jwt')
const URL = process.env.MONGO_URL

app.use(express.json())
app.use(morgan('dev'))

mongoose.connect(URL)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

app.use("/api/auth", require("./routes/authRouter.js") )
app.use("/api/main", expressjwt({ secret: process.env.SECRET, algorithms: ['HS256'] })) //req.auth
app.use("/api/main/calls", require("./routes/callRouter.js"))
app.use("/api/main/trucks", require("./routes/truckRouter.js"))
 

app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === "UnauthorizedError"){
      res.status(err.status)
    }
    return res.send({errMsg: err.message})
  })

app.listen(9000, () => {
    console.log("app is listening to port 9000!")
})

