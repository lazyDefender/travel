import { Router } from 'express';
import OrderService from '../services/order.service';
import validation from '../middlewares/validation/order.validation.middleware';
import { errorCodes } from '../common/enum/errors/error-codes';
import { validationResult } from 'express-validator';
import validationError from '../utils/validation-error';
import isAuth from '../middlewares/auth.middleware';

const router = Router();

router.post('/', isAuth, validation.save, async (req, res, next) => {
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
        const { data: createdOrder, error } = await OrderService.create(req.body);
        req.result = {
            status: 201,
            body: createdOrder,
        };
        
        next(); 
    }
});

export { router };
