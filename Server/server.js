const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
const connection = require('./Connections/db')
const userRoutes = require('./Routes/userRoutes')
const mongoose = require('mongoose')

app.use(express.json())
app.use(cors())


dotenv.config()
connection()

// const connectionParams={
//     useNewUrlParser:true,
//     useUnifiedTopology:true
// };
// try {
//     mongoose.connect(process.env.DATABASE_ACCESS,connectionParams)
//     console.log(":connected to database")
// } catch (error) {
//     console.log(error);
// }



app.listen(5000,()=>{
    console.log("server running on port 5000");
})

app.use('/',userRoutes)

