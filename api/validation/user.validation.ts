import { body, param } from 'express-validator';

export const validation = {
    save: [
        body('firstName')
            .isString()
            .isLength({
                min: 1,
                max: 255,
            }).withMessage('firstName should be 1 to 255 characters long'),

        body('lastName')
            .isString()
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
            .optional()
            .isString()
            .isLength({
                min: 1,
                max: 255,
            }).withMessage('firstName should be 1 to 255 characters long'),

        body('lastName')
            .optional()
            .isString()
            .isLength({
                min: 1,
                max: 255,
            }).withMessage('lastName should be 1 to 255 characters long'),
        body('authIDs')
            .optional()
            .isArray()
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
