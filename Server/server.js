const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
const connection = require('./Connections/db')
const userRoutes = require('./Routes/userRoutes')
const mongoose = require('mongoose')
let bodyParser = require('body-parser');
const session = require('express-session')

app.use(express.json())
app.use(cors())

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static('./Server')) 
const oneDay = 1000 * 60 * 60 * 24;


dotenv.config()
connection()

app.use(session({
    secret: 'gameGRam00002ks',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: oneDay }
  }))




app.use('/',userRoutes)

app.listen(5000,()=>{
    console.log("server running on port 5000");
})
