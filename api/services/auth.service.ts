import firebase from 'firebase-admin';
import { errors } from '../common/enum/errors';
import { errorCodes } from '../common/enum/errors/error-codes';

import UserService from './user.service';

export default class AuthService {
    _userRepository;

    constructor({ userRepository }) {
        this._userRepository = userRepository;
    }

    async verifyToken(rawToken = '') {
        const token = rawToken.split(' ')[1];
        try {
            const { uid } = await firebase
            .auth()
            .verifyIdToken(token);

            const { data: user, error } = await this._userRepository.getByUid(uid);

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
