const firebase = require('firebase-admin');
const errors = require('../common/enum/errors');
const errorCodes = require('../common/enum/errors/error-codes');
const UserService = require('./UserService');

class AuthService {
    static async verifyToken(rawToken = '') {
        const token = rawToken.split(' ')[1];
        try {
            const { uid } = await firebase
            .auth()
            .verifyIdToken(token);

            const { data: user, error } = await UserService.getByUid(uid);

            if(error && error.code === errorCodes.USERS.USER_NOT_FOUND_BY_UID) {
                return {
                    errors: [error],
                };
            }

            return {
                data: user,
                error: null,
            };
        }
        catch(e) {
            const error = errors.AUTH.invalidToken();
            return {
                data: null,
                error,
            };
        }
        
    }
}

module.exports = AuthService;