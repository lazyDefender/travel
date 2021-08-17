import firebase from 'firebase-admin';
import { errors } from '../common/enum/errors';
import { errorCodes } from '../common/enum/errors/error-codes';

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

            const user = await this._userRepository.getByUid(uid);

            if(user) {
                return {
                    data: user,
                    error: null,
                }
            }
            else {
                const error = errors.USERS.notFoundByUid(uid);
                return {
                    data: null,
                    error,
                };
            }
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
