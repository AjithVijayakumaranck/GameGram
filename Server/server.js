const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
const connection = require('./Connections/db')
const userRoutes = require('./Routes/userRoutes')
const adminRoutes = require('./Routes/AdminRoutes')
const mongoose = require('mongoose')
let bodyParser = require('body-parser');
const session = require('express-session')
const http = require('http')
const { Server } = require('socket.io')
const { log } = require('console')
const path = require('path')

app.use(cors())
app.use(express.json())
app.use('/api/images',express.static(path.join(__dirname,'StaticFiles/postImages')))
// app.use('/api/images',express.static('StaticFiles'))

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




app.use('/api',userRoutes)
app.use('/api/admin',adminRoutes)

app.listen(5000,()=>{
    console.log("server running on port 5000");
})
