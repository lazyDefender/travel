const { Router } = require('express');
const CityService = require('../services/CityService');
const validation = require('../middlewares/validation/city.validation.middleware');
const errorCodes = require('../common/enum/errors/error-codes');
const { validationResult } = require('express-validator');
const validationError = require('../utils/validationError');

const router = Router();

router.post('/', validation.save, async (req, res, next) => {
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
        const { data: createdCity, error } = await CityService.create(req.body);
        req.result = {
            status: 201,
            body: createdCity,
        };
        
        next(); 
    }
});

router.get('/', async (req, res, next) => {
    const { data: cities } = await CityService.getAll();
    req.result = {
        status: 200,
        body: cities,
    }
    
    next();
});

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;  
    const { data: city, error } = await CityService.getById(id);

    if(error && error.code === errorCodes.CITIES.CITY_NOT_FOUND_BY_ID) {
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
            status: 200,
            body: city,
        }
    }
     
    next();
});

router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    const { error } = await CityService.delete(id);

    if(error && error.code === errorCodes.CITIES.CITY_NOT_FOUND_BY_ID) {
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

module.exports = router;