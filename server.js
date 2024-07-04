const express = require('express')
const dotenv = require("dotenv");
const connectDB = require('./config/db');
const ownerRoutes = require('./routes/ownerRoutes')
const app = express()

app.use(express.json())
dotenv.config()

const port = process.env.PORT

connectDB()

app.use("/api/owner",ownerRoutes)


app.listen(port,()=>{
    console.log(`Server Running in ${port}`)
})
