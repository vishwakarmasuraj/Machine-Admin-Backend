import { body } from "express-validator";
import { userModel } from "../models";

export const userValidRule = () => {
    return [
        body('fullName').notEmpty().withMessage('Please enter full name').isAlpha('en-US', {ignore: ' '}).withMessage('Full name should be alpha char!'),
        body('email').notEmpty().withMessage('Please enter email').isEmail().withMessage('Email should be email type')
        .custom(value => {
            return userModel.findOne({email: value}).then(data => {
                if (data) {
                    return Promise.reject('Email is already exist');
                }
            }) 
        }),
        body('password').notEmpty().withMessage('Please enter password').isLength({min: 8}).withMessage('Please enter at least 8 char password')
    ]
};
