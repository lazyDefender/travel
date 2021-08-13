import { Router } from 'express';
import UserService from '../services/user.service';
import { userValidation } from '../middlewares/validation';
import { errorCodes } from '../common/enum/errors/error-codes';
import { validationResult } from 'express-validator';
import { validationError } from '../utils/validation-error';
import { UsersApiPath } from '../common/enum/api';

export const initUser = (Router, services) => {
    const router = Router();
    const { userService } = services;

    router.post(UsersApiPath.ROOT, userValidation.save, async (req, res, next) => {
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
            const { data: createdUser, error } = await userService.create(req.body);
            req.result = {
                status: 201,
                body: createdUser,
            };
            
            next(); 
        }
    });

    router.get(UsersApiPath.ROOT, async (req, res, next) => {
        const { data: users } = await userService.getAll();
        req.result = {
            status: 200,
            body: users,
        }
        
        next();
    });

    router.get(UsersApiPath.$ID, async (req, res, next) => {
        const { id } = req.params;  
        const { data: user, error } = await userService.getById(id);

        if(error && error.code === errorCodes.USERS.USER_NOT_FOUND_BY_ID) {
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
                body: user,
            }
        }
        
        next();
    });

    router.get(UsersApiPath.$ID_ORDERS, async (req, res, next) => {
        const { id } = req.params;  
        const { data: orders, error } = await userService.getOrdersByUser(id);

        if(error && error.code === errorCodes.USERS.USER_NOT_FOUND_BY_ID) {
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
                body: orders,
            }
        }
        
        next();
    });

    router.get(UsersApiPath.SEARCH, async (req, res, next) => {
        const { data: users, error } = await userService.search(req.query);

        req.result = {
            status: 200,
            body: users,
        };

        next();
    });

    router.patch(UsersApiPath.$ID, userValidation.update, async (req, res, next) => {
        const errors = validationResult(req)
            .array()
            .map(error => validationError(error));

        if(errors.length > 0) {
            req.validationErrors = errors;
        }
            
        if(req.validationErrors) {
            next();
        }
        
        const { id } = req.params;
        const { data: updatedUser, error } = await userService.update(id, req.body);

        if(error && error.code === errorCodes.USERS.USER_NOT_FOUND_BY_ID) {
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
                body: updatedUser,
            }
        }

        next();
    });

    router.delete(UsersApiPath.$ID, async (req, res, next) => {
        const { id } = req.params;
        const { error } = await userService.delete(id);

        if(error && error.code === errorCodes.USERS.USER_NOT_FOUND_BY_ID) {
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
