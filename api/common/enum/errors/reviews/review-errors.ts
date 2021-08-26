import { ErrorCodes } from './review-error-codes';

export const Errors = {
    notFoundById: (id: string) => {
        const error = {
            code: ErrorCodes.REVIEW_NOT_FOUND_BY_ID,
            message: `Review ${id} does not exist`,
        };

        return error;
    },
}
