const errorCodes = require("./user-error-codes");

const errors = {
    notFoundById: (id) => {
        const error = {
            code: errorCodes.USER_NOT_FOUND_BY_ID,
            message: `User ${id} does not exist`,
        };

        return error;
    },

    notFoundByUid: (uid) => {
        const error = {
            code: errorCodes.USER_NOT_FOUND_BY_UID,
            message: `User with uid '${uid}' does not exist`,
        };

        return error;
    }
}

module.exports = errors;