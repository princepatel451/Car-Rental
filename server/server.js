import express from "express"
import "dotenv/config"
import cors from "cors"
import mongoose from "mongoose"
import connectDB from "./config/db.js"
import userRouter from "./routes/UserRoutes.js"
import ownerRouter from "./routes/ownerRoutes.js"
import bookingRouter from "./routes/bookingRoutes.js"

const app = express()

await connectDB()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => res.send("Server is running"))
app.get('/health', (req, res) => res.status(200).json({ status: 'ok', uptime: process.uptime() }))

// Middleware to verify database connection before handling API routes
app.use(async (req, res, next) => {
    if (mongoose.connection.readyState !== 1) {
        await connectDB()
    }
    if (mongoose.connection.readyState !== 1) {
        return res.status(503).json({
            success: false,
            message: "Database is connecting or unreachable. Please verify MONGODB_URI and MongoDB Atlas Network Access (whitelist 0.0.0.0/0 on Atlas)."
        })
    }
    next()
})

app.use('/api/user', userRouter)
app.use('/api/owner', ownerRouter)
app.use('/api/bookings', bookingRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=> console.log("Server is runnning on port " + PORT))


