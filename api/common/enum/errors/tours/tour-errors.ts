import { ErrorCodes } from './tour-error-codes';

export const Errors = {
    notFoundById: (id) => {
        const error = {
            code: ErrorCodes.TOUR_NOT_FOUND_BY_ID,
            message: `Tour ${id} does not exist`,
        };

        return error;
    },
}
