import { ErrorCodes } from './user-error-codes';

export const Errors = {
    notFoundById: (id: string) => {
        const error = {
            code: ErrorCodes.USER_NOT_FOUND_BY_ID,
            message: `User ${id} does not exist`,
        };

        return error;
    },

    notFoundByUid: (uid: string) => {
        const error = {
            code: ErrorCodes.USER_NOT_FOUND_BY_UID,
            message: `User with uid '${uid}' does not exist`,
        };

        return error;
    }
}
