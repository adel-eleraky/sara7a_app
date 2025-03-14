import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import sendEmail from "./../utils/email.js"
import CryptoJS from "crypto-js"
import jwt from "jsonwebtoken"
import { saveTokenInCookie } from "../utils/response.js"
import { emailVerify } from '../utils/emailVerification.js';
import ShortUniqueId from 'short-unique-id';

let signUp = async (req, res) => {

    try {

        let { name, email, password, confirmPass, phone } = req.body

        if (password != confirmPass) {
            return res.status(422).json({
                status: "fail",
                message: "password doesn't match pass confirm"
            })
        }

        if (await User.findOne({ email })) {
            return res.status(409).json({
                status: "fail",
                message: "email already exists"
            })
        }


        let salt = bcrypt.genSaltSync(10);
        let hashedPass = bcrypt.hashSync(password, salt)

        if (phone) {
            phone = CryptoJS.HmacSHA1(phone, process.env.ENCRYPTION_KEY)
        }

        let uid = new ShortUniqueId({ length: 6 });
        let verificationCode = uid.rnd()

        let user = await User.create({ name, email, password: hashedPass, phone, verificationCode })

        let token = jwt.sign({ id: user._id, emailVerified: false }, process.env.JWT_SECRET)
        saveTokenInCookie(res , token)

        // let verifyUrl = `${req.protocol}://${req.get("host")}/api/v1/users/verifyEmail/${token}`
        
        await sendEmail({
            email,
            subject: "Verify your email",
            message: `verification code: ${verificationCode}`
        })

        let objUser = user.toObject()
        delete objUser.password

        res.status(200).json({
            status: "success",
            message: "You signed-up successfully, Please Check your Email to verify your account",
            data: objUser
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

let login = async (req, res) => {

    try {

        let { email, password } = req.body

        let user = await User.findOne({ email })

        if (!user) {
            return res.status(401).json({
                status: "fail",
                message: "authentication failed",
                data: { email: "Incorrect email"}
            })
        }

        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({
                status: "fail",
                message: "authentication failed",
                data: { password: "Incorrect password"}
            })
        }

        let token;
        if (! user.emailVerified) {
            return emailVerify(req, res, user)
        }

        token = jwt.sign({ id: user._id, emailVerified: true }, process.env.JWT_SECRET)
        saveTokenInCookie(res , token)

        let objUser = user.toObject()
        delete objUser.password

        res.status(200).json({
            status: "success",
            message: "Logged-in successfully",
            token,
            data: objUser
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}


let upload = async (req, res) => {

    try {

        let user = req.user
        user.photo = req.file.filename

        user = await user.save()

        res.status(200).json({
            status: "success",
            message: "Photo uploaded successfully",
            data: user
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

let verifyEmail = async (req, res) => {

    try {

        let { code } = req.body

        let token = req.cookies.jwt
        let decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findOne({ _id: decoded.id, verificationCode: code })

        if (!user) {
            return res.status(401).json({
                status: "fail",
                message: "Invalid verification code"
            })
        }

        user.emailVerified = true
        user.verificationCode = ""
        await user.save()

        token = jwt.sign({ id: user._id, emailVerified: true }, process.env.JWT_SECRET)
        saveTokenInCookie(res , token)

        let objectUser = user.toObject()
        delete objectUser.password

        res.status(200).json({
            status: "success",
            message: "Email verified successfully",
            token,
            data: objectUser
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

let logout = async (req, res) => {
    
    try {

        res.cookie("jwt" , "logout", {expires: new Date(Date.now() + 10 * 1000), httpOnly: true})

        res.status(200).json({
            status: "success",
            message: "Logged-out successfully"
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

let getLoggedInUser = async (req, res) => {
    
    try {

        let user = req.user

        res.status(200).json({
            status: "success",
            data: user
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export {
    login,
    signUp,
    upload,
    verifyEmail,
    logout,
    getLoggedInUser
}