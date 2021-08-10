import { body } from 'express-validator';

            // adultsCount,
            // kidsCount,
            // datetime,
            // tourId,
            // userId,

export const validation = {
    save: [
        body('adultsCount')
            .isInt({
                min: 1,
            }).withMessage('Should be an integer more than 1'),

        body('kidsCount')
            .isInt({
                min: 0,
            }).withMessage('Should be an non-negative integer'),
    ],
}
