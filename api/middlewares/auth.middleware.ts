const AuthService = require('../services/auth.service');

export const isAuth = async (req, res, next) => {
    const token = req.header('authorization');

    const { data: user, error } = await AuthService.verifyToken(token);
    if(error) {
        req.result = {
            body: error,
            status: 401,
        };
    }
    else {
        req.userId = user.id;
    }

    next();
};
