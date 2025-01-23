import express from "express"
import * as userController from "./../controllers/user.controller.js"
import uploadPhoto, { resizePhoto } from "../utils/uploadPhoto.js"
import { loginSchema, loginValidation, signUpSchema, signUpValidation } from "../utils/validation.js"
import { protectedRoute } from "../middlewares/authMiddleware.js"

const router = express.Router()


router.post("/login" , loginValidation(loginSchema) , userController.login)
router.post("/signup" , signUpValidation(signUpSchema) , userController.signUp)
router.put("/upload/:id", protectedRoute , uploadPhoto, resizePhoto , userController.upload)
router.put("/verifyEmail/:token" , userController.verifyEmail)

export default router