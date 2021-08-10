const errors = require("../common/enum/errors/error-codes")

export const validationError = (error) => {
    const result = {
        code: errors.USERS.VALIDATION_ERROR,
        message: error.msg,
    };

    return result;
}
