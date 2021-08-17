import { ErrorCodes } from './auth-error-codes';

export const Errors = {
    invalidToken: () => {
        const error = {
            code: ErrorCodes.INVALID_TOKEN,
            message: `Invalid token`,
        };

        return error;
    },
}
