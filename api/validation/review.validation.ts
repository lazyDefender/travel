import { body } from 'express-validator';

export const validation = {
    save: [
        body('userId')
            .exists().withMessage('userId is required')
            .notEmpty().withMessage('userId should not be an empty string'),

        body('hotelId')
            .exists().withMessage('hotelId is required')
            .notEmpty().withMessage('hotelId should not be an empty string'),

        body('content')
            .isLength({
                min: 1,
                max: 255,
            }).withMessage('content should be 1 to 255 characters long'),
        
        body('rating')  
            .isInt({
                min: 0,
                max: 5,
            }).withMessage('rating should be an integer between 0 and 5'),
    ]
}
