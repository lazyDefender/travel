const errors = require("../common/enum/errors/error-codes")

const validationError = (error) => {
    const result = {
        code: errors.USERS.VALIDATION_ERROR,
        message: error.msg,
    };

    return result;
}

module.exports = validationError;