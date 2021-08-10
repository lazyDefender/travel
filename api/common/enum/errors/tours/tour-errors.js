const errorCodes = require("./tour-error-codes");

const errors = {
    notFoundById: (id) => {
        const error = {
            code: errorCodes.TOUR_NOT_FOUND_BY_ID,
            message: `Tour ${id} does not exist`,
        };

        return error;
    },
}

module.exports = errors;