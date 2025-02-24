import jwt from "jsonwebtoken"
import User from "./../models/user.model.js"
import { emailVerify } from "../utils/emailVerification.js"

export const protectedRoute = async (req, res, next) => {

    let token;
    let { authorization } = req.headers
    if(req.headers.authorization) {
        token = authorization.split(" ")[1]
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt
    }

    if(! token) {
        return res.status(401).json({
            status: "fail",
            message: "Login first"
        })
    }
    
    let decoded = jwt.verify(token, process.env.JWT_SECRET)

    let user = await User.findById(decoded.id).select("-password")

    if (!user) {
        return res.status(401).json({
            status: "fail",
            message: "User not found"
        })
    }

    if (!decoded.emailVerified) {
        return emailVerify(req, res, user)
    }

    req.user = user
    next()
}