import { hotelValidation } from '../middlewares/validation';
import { errorCodes } from '../common/enum/errors/error-codes';
import { validationResult } from 'express-validator';
import { validationError } from '../utils/validation-error';
import { HotelsApiPath } from '../common/enum/api';

export const initHotel = (Router, services) => {
    const router = Router();
    const { hotelService } = services;

    router.post(HotelsApiPath.ROOT, hotelValidation.save, async (req, res, next) => {
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
            const { data: createdHotel, error } = await hotelService.create(req.body);
            req.result = {
                status: 201,
                body: createdHotel,
            };
            
            next(); 
        }
    });

    router.get(HotelsApiPath.ROOT, async (req, res, next) => {
        const { data: hotels } = await hotelService.getAll();
        req.result = {
            status: 200,
            body: hotels,
        }
        
        next();
    });

    router.get(HotelsApiPath.$ID, async (req, res, next) => {
        const { id } = req.params;  
        const { data: hotel, error } = await hotelService.getById(id);

        if(error && error.code === errorCodes.HOTELS.HOTEL_NOT_FOUND_BY_ID) {
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
                body: hotel,
            }
        }
        
        next();
    });

    router.get(HotelsApiPath.$ID_TOURS, async (req, res, next) => {
        const { id } = req.params;
        const { data: tours, error } = await hotelService.getToursByHotel(id);

        if(error && error.code === errorCodes.HOTELS.HOTEL_NOT_FOUND_BY_ID) {
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
                body: tours,
            }
        }

        next();
    })

    router.delete(HotelsApiPath.$ID, async (req, res, next) => {
        const { id } = req.params;
        const { error } = await hotelService.delete(id);

        if(error && error.code === errorCodes.HOTELS.HOTEL_NOT_FOUND_BY_ID) {
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
}
