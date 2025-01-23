import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRouter from "./routes/user.router.js"
import messageRouter from "./routes/message.router.js"

dotenv.config({ path: ".env" })
const app = express()

app.use(express.json())
app.use("/api/v1/users" , userRouter)
app.use("/api/v1/messages" , messageRouter)

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