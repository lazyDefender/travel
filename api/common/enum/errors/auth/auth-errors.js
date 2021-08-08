const ErrorCodes = require("./auth-error-codes");

const Errors = {
    invalidToken: () => {
        const error = {
            code: ErrorCodes.INVALID_TOKEN,
            message: `Invalid token`,
        };

        return error;
    },
}

module.exports = Errors;