import mongoose from "mongoose";


const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true , "Message text is required"]
    },
    sender_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true , "Please provide sender user ID"]
    },
    receiver_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true , "Please provide receiver user ID"]
    }
} , {timestamps: true})


const messageModel = mongoose.model("Message" , messageSchema)

export default messageModel