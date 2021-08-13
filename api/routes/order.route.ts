import { orderValidation } from '../middlewares/validation';
import { errorCodes } from '../common/enum/errors/error-codes';
import { validationResult } from 'express-validator';
import { validationError } from '../utils/validation-error';
import { isAuth } from '../middlewares/auth.middleware';
import { OrdersApiPath } from '../common/enum/api';

export const initOrder = (Router, services) => {
    const router = Router();
    const { orderService } = services;

    router.post(OrdersApiPath.ROOT, isAuth, orderValidation.save, async (req, res, next) => {
        if(!req.userId) {
            next();
        }
        const errors = validationResult(req)
            .array()
            .map(error => validationError(error));

        if(errors.length > 0) {
            req.validationErrors = errors;
        }
        
        if(req.validationErrors) {
            next();
        }

        else {
            const { data: createdOrder, error } = await orderService.create(req.body);
            req.result = {
                status: 201,
                body: createdOrder,
            };
            
            next(); 
        }
    });

    return router;
}
