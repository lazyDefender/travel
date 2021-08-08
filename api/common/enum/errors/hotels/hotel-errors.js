const errorCodes = require("./hotel-error-codes");

const errors = {
    notFoundById: (id) => {
        const error = {
            code: errorCodes.HOTEL_NOT_FOUND_BY_ID,
            message: `Hotel ${id} does not exist`,
        };

        return error;
    },
}

module.exports = errors;