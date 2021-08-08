const ErrorCodes = require("./city-error-codes");

const Errors = {
    notFoundById: (id) => {
        const error = {
            code: ErrorCodes.CITY_NOT_FOUND_BY_ID,
            message: `City ${id} does not exist`,
        };

        return error;
    },
}

module.exports = Errors;