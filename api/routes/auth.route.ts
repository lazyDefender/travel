import { errorCodes } from '../common/enum/errors/error-codes';
import { AuthApiPath } from '../common/enum/api';

export const initAuth = (Router, services) => {
    const router = Router();
    const { authService } = services;

    router.get(AuthApiPath.CURRENT_USER, async (req, res, next) => {
        const token = req.header('authorization');
        
        const { data: user, error } = await authService.verifyToken(token);

        switch(error?.code) {
            case errorCodes.AUTH.INVALID_TOKEN:
                req.result = {
                    body: error,
                    status: 401,
                };
                break;
            case errorCodes.USERS.USER_NOT_FOUND_BY_UID:
                req.result = {
                    body: error,
                    status: 404,
                };
                break;
            default:
                req.result = {
                    body: user,
                    status: 200,
                };
                break;
        }
        
        next();
    });

    return router;
};
