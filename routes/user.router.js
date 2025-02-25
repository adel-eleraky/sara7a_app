import express from "express"
import * as userController from "./../controllers/user.controller.js"
import uploadPhoto, { resizePhoto } from "../utils/uploadPhoto.js"
import { loginSchema, loginValidation, signUpSchema, signUpValidation } from "../utils/validation.js"
import { protectedRoute } from "../middlewares/authMiddleware.js"

const router = express.Router()


router.post("/login" , loginValidation(loginSchema) , userController.login)
router.post("/signup" , signUpValidation(signUpSchema) , userController.signUp)
router.put("/upload/:id", protectedRoute , uploadPhoto, resizePhoto , userController.upload)
router.put("/verify" ,  userController.verifyEmail)
router.get("/logout" ,protectedRoute , userController.logout)
router.get("/me" , protectedRoute , userController.getLoggedInUser)

export default router