const express = require('express')
const dotenv = require("dotenv");
const connectDB = require('./config/db');
const cors = require('cors')
const ownerRoutes = require('./routes/ownerRoutes')
const customerRoutes = require('./routes/customerRoutes')
const serviceRoutes = require('./routes/serviceRoutes')
const vehicleRoutes = require('./routes/vehicleRoutes')
const bookingRoutes = require('./routes/bookingRoutes')
const app = express()

app.use(express.json());
app.use(cors());

dotenv.config()

const port = process.env.PORT

connectDB()

app.use("/api/owner",ownerRoutes)
app.use("/api/services",serviceRoutes)
app.use("/api/customer", customerRoutes)
app.use("/api/vehicle", vehicleRoutes)
app.use("/api/bookings",bookingRoutes)

app.listen(port,()=>{
    console.log(`Server Running in ${port}`)
})
