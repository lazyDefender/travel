import { isAuth } from '../middlewares/auth.middleware';
import { reviewValidation } from '../validation';
import { errorCodes } from '../common/enum/errors/error-codes';
import { ReviewsApiPath } from '../common/enum/api';
import { validate } from '../middlewares/validation.middleware';

export const initReview = (Router, services) => {
    const router = Router();
    const { reviewService } = services;

    router.post(ReviewsApiPath.ROOT, isAuth, validate(reviewValidation.save), async (req, res, next) => {
        const { data: createdReview, error } = await reviewService.create(req.body);
        req.result = {
            status: 201,
            body: createdReview,
        };
            
        next(); 
    });

    router.delete(ReviewsApiPath.$ID, async (req, res, next) => {
        const { id } = req.params;
        const { error } = await reviewService.delete(id);

        if(error && error.code === errorCodes.REVIEWS.REVIEW_NOT_FOUND_BY_ID) {
            const body = {
                errors: [error],
            }

            req.result = {
                body,
                status: 404,
            }
        }

        else {
            req.result = {
                status: 204,
            }
        }
        
        next();
    });

    return router;
};
