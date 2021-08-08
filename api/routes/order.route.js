const { Router } = require('express');
const OrderService = require('../services/OrderService');
const validation = require('../middlewares/validation/order.validation.middleware');
const errorCodes = require('../common/enum/errors/error-codes');
const { validationResult } = require('express-validator');
const validationError = require('../utils/validationError');
const isAuth = require('../middlewares/auth.middleware');

const router = Router();

router.post('/', isAuth, validation.save, async (req, res, next) => {
    if(!req.userId) {
        next();
    }
    const errors = validationResult(req)
        .errors
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

module.exports = router;