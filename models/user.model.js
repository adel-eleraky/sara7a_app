import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true , "userName is Required"],
    },
    email: {
        type: String,
        required: [true , "email is Required"],
        unique: [true , "Email exist in database"]
    },
    password: {
        type: String,
        required: [true , "password is required"]
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    photo: {
        type: String,
        default: "default.jpeg"
    },
    phone: {
        type: String,
        required: [true , "Phone is required" ]
    }
}, {timestamps: true})



const userModel = mongoose.model("User" , userSchema)

export default userModel