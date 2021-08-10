import { ErrorCodes as UserErrorCodes } from './users/user-error-codes';
import { ErrorCodes as CityErrorCodes } from './cities/city-error-codes';
import { ErrorCodes as AuthErrorCodes } from './auth/auth-error-codes';
import { ErrorCodes as HotelErrorCodes } from './hotels/hotel-error-codes';
import { ErrorCodes as TourErrorCodes } from './tours/tour-error-codes';

export const errorCodes = {
    USERS: UserErrorCodes,
    CITIES: CityErrorCodes,
    AUTH: AuthErrorCodes,
    HOTELS: HotelErrorCodes,
    TOURS: TourErrorCodes,
};
