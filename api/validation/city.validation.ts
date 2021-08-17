import { body } from 'express-validator';

export const validation = {
    save: [
        body('continent')
            .isLength({
                min: 1,
                max: 255,
            }).withMessage('continent should be 1 to 255 characters long'),

        body('country')
            .isLength({
                min: 1,
                max: 255,
            }).withMessage('country should be 1 to 255 characters long'),
        
        body('name')
            .isLength({
                min: 1,
                max: 255,
            }).withMessage('name should be 1 to 255 characters long'),
    ],
}
