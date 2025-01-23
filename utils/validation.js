import joi from "joi"


export const loginSchema = joi.object({
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().messages({
        'string.email': 'Please enter valid email.',
        'string.empty': 'Email cannot be empty.',
        'any.required': 'Email is a required field.'
    }),
    password: joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required().messages({
        'string.pattern.base': 'Password must contain only alphanumeric characters and be 3-30 characters long.',
        'string.empty': 'Password cannot be empty.',
        'any.required': 'Password is a required field.'
    })
}).options({ allowUnknown: false })


export const loginValidation = (schema) => {
    return (req, res, next) => {

        let validation = schema.validate(req.body, { abortEarly: false })
        if (validation.error && validation.error.details) {
            let errors = {}
            for (let error of validation.error.details) {
                errors[error.path[0]] = error.message
            }

            return res.status(400).json({
                status: "fail",
                message: "validation error",
                data: errors
            })
        }
        next()
    }
}


export const signUpSchema = joi.object({
    name: joi.string().min(2).max(16).required().messages({
        'string.min': "name must be 2-16 characters long",
        'string.max': "name must be 2-16 characters long",
        'any.required': "name is required"
    }),
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().messages({
        'string.email': 'Please enter valid email.',
        'string.empty': 'Email cannot be empty.',
        'any.required': 'Email is a required field.'
    }),
    password: joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required().messages({
        'string.pattern.base': 'Password must contain only alphanumeric characters and be 3-30 characters long.',
        'string.empty': 'Password cannot be empty.',
        'any.required': 'Password is a required field.'
    }),
    confirmPass: joi.string().valid(joi.ref("password")).required().messages({
        'any.only': "confirm password must match password"
    }),
    phone: joi.string().pattern(new RegExp(/^(010|011|012|015)[0-9]{8}/)).required().messages({
        'string.pattern.base': "Invalid phone number",
        'string.empty': 'Phone cannot be empty.',
        'any.required': 'Phone is a required field.'
    })
}).options({ allowUnknown: false })


export const signUpValidation = (schema) => {
    return (req, res, next) => {

        let validation = schema.validate(req.body, { abortEarly: false })
        if (validation.error && validation.error.details) {
            
            let errors = {}
            for (let error of validation.error.details) {
                errors[error.context.label] = error.message
            }

            return res.status(400).json({
                status: "fail",
                message: "validation error",
                data: errors
            })
        }
        next()
    }
}


export const messageSchema = joi.object({
    text: joi.string().required().messages({
        'any.required': "message text is required"
    }),
    receiver_user_id: joi.string().required().messages({
        'any.required': "receiver_user_id is required"
    }),
})

export const messageValidation = (schema) => {
    return (req , res , next) => {

        let validation = schema.validate(req.body, { abortEarly: false })
        if (validation.error && validation.error.details) {
            
            let errors = {}
            for (let error of validation.error.details) {
                errors[error.context.label] = error.message
            }

            return res.status(400).json({
                status: "fail",
                message: "validation error",
                data: errors
            })
        }
        next()
    }
}