const { Router } = require('express');
const errorCodes = require('../common/enum/errors/error-codes');
const AuthService = require('../services/auth.service');

const router = Router();

router.get('/currentUser', async (req, res, next) => {
    const token = req.header('authorization');
    const { data: user, error } = await AuthService.verifyToken(token);

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

module.exports = router;