import { body, param } from 'express-validator';

export const validation = {
    save: [
        body('firstName')
            .isLength({
                min: 1,
                max: 255,
            }).withMessage('firstName should be 1 to 255 characters long'),

        body('lastName')
            .isLength({
                min: 1,
                max: 255,
            }).withMessage('lastName should be 1 to 255 characters long'),
        
        body('email')
            .isEmail().withMessage('email is not valid'),

        body('authID')
            .isString().withMessage('authID should be a string')
    ],
    update: [
        body('firstName')
            .isLength({
                min: 1,
                max: 255,
            }).withMessage('firstName should be 1 to 255 characters long'),

        body('lastName')
            .isLength({
                min: 1,
                max: 255,
            }).withMessage('lastName should be 1 to 255 characters long'),
    ],
    setPassword: [
        body('newPassword')
            .isLength({
                min: 6,
            }).withMessage('Password should be 6 or more characters long'),
        body('email')
            .isEmail().withMessage('Should be valid email'),
    ],
}

module.exports = validation;