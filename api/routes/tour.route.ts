import { Router } from 'express';
import TourService from '../services/tour.service';
import { hotelValidation } from '../middlewares/validation';
import { errorCodes } from '../common/enum/errors/error-codes';
import { validationResult } from 'express-validator';
import { validationError } from '../utils/validation-error';
import { ToursApiPath } from '../common/enum/api';

export const initTour = (Router, services) => {
    const router = Router();
    const { tourService } = services;

    router.get(ToursApiPath.ROOT, async (req, res, next) => {
        const { data: tours, error } = await tourService.getAll(req.query);
        
        req.result = {
            status: 200,
            body: tours,
        }

        next();
    })

    router.get(ToursApiPath.$ID, async (req, res, next) => {
        const { id } = req.params;  
        const { data: tour, error } = await tourService.getById(id);

        if(error && error.code === errorCodes.TOURS.TOUR_NOT_FOUND_BY_ID) {
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
                body: tour,
            }
        }
        
        next();
    });

    return router;
};
