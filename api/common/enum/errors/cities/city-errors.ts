import { ErrorCodes } from './city-error-codes';

export const Errors = {
    notFoundById: (id: string) => {
        const error = {
            code: ErrorCodes.CITY_NOT_FOUND_BY_ID,
            message: `City ${id} does not exist`,
        };

        return error;
    },
}
