import jwt from "jsonwebtoken"
import sendEmail from "./email.js"
import emailTemplate from "./emailTemplate.js"

export const emailVerify = async (req , res, user) => {
    let token = jwt.sign({ id: user._id, emailVerified: false }, process.env.JWT_SECRET)

    let verifyUrl = `${req.protocol}://${req.get("host")}/api/v1/users/verifyEmail/${token}`

    await sendEmail({
        email: user.email,
        subject: "Verify your email",
        html: emailTemplate(verifyUrl)
    })

    return res.status(401).json({
        status: "fail",
        message: "Check your email to verify first",
    })
}