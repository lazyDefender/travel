import { cityValidation } from '../middlewares/validation';
import { errorCodes } from '../common/enum/errors/error-codes';
import { validationResult } from 'express-validator';
import { validationError } from '../utils/validation-error';
import { CitiesApiPath } from '../common/enum/api';

export const initCity = (Router, services) => {
    const router = Router();
    const { cityService } = services;

    router.post(CitiesApiPath.ROOT, cityValidation.save, async (req, res, next) => {
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
            const { data: createdCity, error } = await cityService.create(req.body);
            req.result = {
                status: 201,
                body: createdCity,
            };
            
            next(); 
        }
    });

    router.get(CitiesApiPath.ROOT, async (req, res, next) => {
        const { data: cities } = await cityService.getAll();
        req.result = {
            status: 200,
            body: cities,
        }
        
        next();
    });

    router.get(CitiesApiPath.$ID, async (req, res, next) => {
        const { id } = req.params;  
        const { data: city, error } = await cityService.getById(id);

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

    router.delete(CitiesApiPath.$ID, async (req, res, next) => {
        const { id } = req.params;
        const { error } = await cityService.delete(id);

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

    return router;
};
