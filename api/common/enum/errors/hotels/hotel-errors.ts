import { ErrorCodes } from './hotel-error-codes';

export const Errors = {
    notFoundById: (id: string) => {
        const error = {
            code: ErrorCodes.HOTEL_NOT_FOUND_BY_ID,
            message: `Hotel ${id} does not exist`,
        };

        return error;
    },
}
