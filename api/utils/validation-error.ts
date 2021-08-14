import { errorCodes } from '../common/enum/errors/error-codes';

export const validationError = (error) => {
    const result = {
        code: errorCodes.USERS.VALIDATION_ERROR,
        message: error.msg,
    };

    return result;
}
