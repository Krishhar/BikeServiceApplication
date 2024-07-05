const express = require('express')
const dotenv = require("dotenv");
const connectDB = require('./config/db');
const ownerRoutes = require('./routes/ownerRoutes')
const customerRoutes = require('./routes/customerRoutes')
const serviceRoutes = require('./routes/serviceRoutes')
const app = express()

app.use(express.json())
dotenv.config()

const port = process.env.PORT

connectDB()

app.use("/api/owner",ownerRoutes)
app.use("/api/services",serviceRoutes)
app.use("/api/customer", customerRoutes)


app.listen(port,()=>{
    console.log(`Server Running in ${port}`)
})
