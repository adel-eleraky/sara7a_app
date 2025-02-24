import Message from "../models/messages.model.js"
import User from "../models/user.model.js"
import jwt from "jsonwebtoken"

export const sendMessage = async (req, res) => {
    try {

        let { receiver_user_id } = req.body

        const receiver_user = await User.findById(receiver_user_id)
        if (!receiver_user) {
            return res.status(404).json({
                status: "fail",
                message: "receiver_user not found"
            })
        }

        const message = await Message.create({...req.body , sender_user_id: req.user._id})

        res.status(200).json({
            status: "success",
            message: "Message sent successfully",
        })

    } catch (err) {
        res.status(500).json({
            status: "fail",
            message: err.message
        })
    }
}


export const getMessages = async (req, res) => {
    try {

        let { message_type } = req.params
        let messages;
        if (message_type == "received") {
            messages = await Message.find({ receiver_user_id: req.user._id })
        } else if (message_type == "sent") {
            messages = await Message.find({ sender_user_id: req.user._id })
        }

        res.status(200).json({
            status: "success",
            data: messages
        })

    } catch (err) {
        res.status(500).json({
            status: "fail",
            message: err.message
        })
    }
}


export const deleteMessage = async (req, res) => {
    try {

        const { id } = req.params

        const message = await Message.findByIdAndDelete(id)

        res.status(200).json({
            status: "success",
            message: "Message deleted successfully"
        })

    } catch (err) {
        res.status(500).json({
            status: "fail",
            message: err.message
        })
    }
}
