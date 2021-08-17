import { body } from 'express-validator';

export const validation = {
    save: [
        body('name')
            .isLength({
                min: 1,
                max: 255,
            }).withMessage('name should be 1 to 255 characters long'),

        body('maxAdultsCount')
            .isInt().withMessage('maxAdultsCount should be an integer'),

        body('maxKidsCount')
            .isInt().withMessage('maxKidsCount should be an integer'),
    ],
}
