import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRouter from "./routes/user.router.js"
import messageRouter from "./routes/message.router.js"
import cors from "cors"
import cookieParser from "cookie-parser"

dotenv.config({ path: ".env" })
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use("/api/v1/users" , userRouter)
app.use("/api/v1/messages" , messageRouter)

app.use((err , req, res, next) => {

    return res.status(409).json({
        status: "fail",
        message: err.message
    })
})

const DB = process.env.MONGO_URL.replace(
    "<db_password>",
    process.env.MONGO_PASS
)

mongoose.connect(DB)
    .then(conn => {
        console.log("DB connected Successfully")

        const port = process.env.PORT || 3000
        const server = app.listen(port , () =>{
            console.log(`App listening on port ${port}`)
        })
    })